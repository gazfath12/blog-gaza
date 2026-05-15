require('dotenv').config();
const axios = require('axios');
const Groq = require('groq-sdk');
const slugify = require('slugify');

// Configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const SITE_URL = process.env.SITE_URL || 'https://blog.gazaalfath.my.id';

const groq = new Groq({ apiKey: GROQ_API_KEY });

async function fetchTrendingTopics() {
    console.log("Fetching trending topics from HN and Dev.to...");
    let topics = [];

    try {
        // 1. Hacker News
        const hnRes = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
        const hnIds = hnRes.data.slice(0, 15); // Get a few more
        for (const id of hnIds) {
            const detail = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            if (detail.data.title) {
                topics.push({ source: 'Hacker News', title: detail.data.title, url: detail.data.url });
            }
        }

        // 2. Dev.to
        const devtoRes = await axios.get("https://dev.to/api/articles?per_page=15&top=7");
        devtoRes.data.forEach(art => {
            topics.push({ source: 'Dev.to', title: art.title, description: art.description });
        });

        // Shuffle topics to ensure variety
        topics = topics.sort(() => Math.random() - 0.5);

    } catch (error) {
        console.error("Error fetching topics:", error.message);
    }

    return topics;
}

async function generateArticle(topics) {
    console.log("Generating high-quality article with Groq (Llama 3)...");

    // Pick a random topic index to suggest to the AI, or just shuffle the list
    const randomIndex = Math.floor(Math.random() * topics.length);
    const suggestedTopic = topics[randomIndex].title;

    const prompt = `
    You are an expert technical writer and senior software engineer.
    Current date: ${new Date().toISOString()}
    
    Here is a list of trending topics:
    ${JSON.stringify(topics.slice(0, 15))}

    TASK:
    1. Pick ONE unique topic from the list above. 
    2. Preference: You might want to look into "${suggestedTopic}" or any other interesting one.
    3. Write a professional, original, and deeply technical article.
    4. Ensure the title is catchy and UNIQUE (avoid generic titles).
    5. The content must be different from previous technical blogs.

    REQUIREMENTS:
    - Language: English
    - Length: At least 1200 words.
    - Style: Professional, insightful, like Vercel, Stripe, or high-end Medium engineering blogs.
    - Format: Markdown.
    - Structure: Unique Title, Compelling Excerpt, Detailed Body with H2/H3, Practical Code Blocks, FAQ, and Conclusion.

    Return the response strictly in JSON format:
    {
        "title": "...",
        "excerpt": "...",
        "content": "Markdown content here...",
        "category": "Coding|AI|Backend|Frontend|Tech",
        "tags": ["tag1", "tag2"],
        "metaDescription": "150-160 chars SEO description",
        "readingTime": "X min read"
    }
    `;

    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.8, // Increased for variety
        response_format: { type: "json_object" }
    });

    return JSON.parse(chatCompletion.choices[0].message.content);
}

async function saveToBlog(article) {
    console.log("Saving article to blog database...");
    
    // Generate unique slug
    const timestamp = Date.now().toString(36).substring(5);
    article.slug = slugify(article.title, { lower: true, strict: true }) + '-' + timestamp;
    article.published = true;

    try {
        const res = await axios.post(`${SITE_URL}/api/admin/auto-post`, article, {
            headers: {
                'x-api-key': ADMIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log("Successfully posted:", res.data.message);
        console.log("URL:", `${SITE_URL}/blog/${article.slug}`);
    } catch (error) {
        console.error("Error saving post:", error.response?.data || error.message);
    }
}

async function run() {
    if (!GROQ_API_KEY) {
        console.error("GROQ_API_KEY is missing!");
        process.exit(1);
    }

    try {
        const topics = await fetchTrendingTopics();
        if (topics.length === 0) throw new Error("No topics found");

        const article = await generateArticle(topics);
        await saveToBlog(article);
        
        console.log("Auto blogging task completed successfully!");
    } catch (error) {
        console.error("Automation failed:", error.message);
        process.exit(1);
    }
}

run();
