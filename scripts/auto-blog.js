const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const slugify = require('slugify');

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY; // For securing the internal API
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function fetchTrendingTopics() {
    console.log("Fetching trending topics...");
    const topics = [];

    try {
        // 1. Hacker News
        const hnRes = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
        const hnIds = hnRes.data.slice(0, 10);
        for (const id of hnIds) {
            const detail = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            topics.push({ source: 'Hacker News', title: detail.data.title, url: detail.data.url });
        }

        // 2. Dev.to
        const devtoRes = await axios.get("https://dev.to/api/articles?per_page=10&top=7");
        devtoRes.data.forEach(art => {
            topics.push({ source: 'Dev.to', title: art.title, description: art.description });
        });

    } catch (error) {
        console.error("Error fetching topics:", error.message);
    }

    return topics;
}

async function generateArticle(topics) {
    console.log("Generating article with Gemini...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an expert technical writer and software engineer. 
    Based on these trending topics in the developer community:
    ${JSON.stringify(topics)}

    Pick ONE of the most interesting and relevant topics (AI, Coding, Next.js, React, Fullstack, Backend, or Dev Tools) and write a comprehensive, original, and SEO-optimized blog post.

    REQUIREMENTS:
    - Language: English
    - Length: At least 1200 words.
    - Style: Professional, modern developer style (like Vercel or Medium).
    - Format: Markdown.
    - Structure:
        - Catchy Title
        - SEO Meta Description (150-160 characters)
        - Short Excerpt
        - Introduction
        - Detailed Body with multiple Headings (H2, H3)
        - Code Examples (if relevant, using proper markdown blocks)
        - FAQ Section at the end
        - Conclusion
    - Category: Choose from (Coding, AI, Backend, Frontend, Career, Tech)
    - Tags: 3-5 relevant tags.

    IMPORTANT: Return the response strictly in JSON format with the following keys:
    {
        "title": "...",
        "excerpt": "...",
        "content": "...", (Markdown content)
        "category": "...",
        "tags": ["...", "..."],
        "metaDescription": "...",
        "readingTime": "..."
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON from markdown blocks if any
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
}

async function saveToBlog(article) {
    console.log("Saving article to database...");
    
    // Generate unique slug
    article.slug = slugify(article.title, { lower: true, strict: true }) + '-' + Math.random().toString(36).substring(2, 7);
    article.published = true; // Auto publish for auto blogging

    try {
        const res = await axios.post(`${SITE_URL}/api/admin/auto-post`, article, {
            headers: {
                'x-api-key': ADMIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log("Successfully posted:", res.data.message);
    } catch (error) {
        console.error("Error saving post:", error.response?.data || error.message);
    }
}

async function run() {
    if (!GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is missing!");
        process.exit(1);
    }

    try {
        const topics = await fetchTrendingTopics();
        if (topics.length === 0) throw new Error("No topics found");

        const article = await generateArticle(topics);
        await saveToBlog(article);
        
        console.log("Auto blogging task completed!");
    } catch (error) {
        console.error("Automation failed:", error.message);
        process.exit(1);
    }
}

run();
