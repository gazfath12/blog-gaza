import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      title, 
      slug, 
      content, 
      excerpt, 
      category, 
      tags, 
      metaDescription, 
      readingTime, 
      published,
      thumbnail 
    } = body;

    // Check for existing slug (though script adds randomness)
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        tags,
        metaDescription,
        readingTime,
        published: !!published,
        thumbnail: thumbnail || null,
      },
    });

    return NextResponse.json({ 
      message: "Post created successfully", 
      id: post.id,
      slug: post.slug 
    });

  } catch (error: any) {
    console.error("Auto-post API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
