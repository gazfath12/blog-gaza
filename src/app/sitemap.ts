import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: any[] = [];
  
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    blogEntries = posts.map((post) => ({
      url: `https://gazaalfath.my.id/blog/${post.slug}`,
      lastModified: post.updatedAt,
    }));
  } catch (error) {
    console.error("Sitemap generation skipped: Database connection failed.");
  }

  return [
    {
      url: "https://gazaalfath.my.id",
      lastModified: new Date(),
    },
    {
      url: "https://gazaalfath.my.id/blog",
      lastModified: new Date(),
    },
    {
      url: "https://gazaalfath.my.id/about",
      lastModified: new Date(),
    },
    {
      url: "https://gazaalfath.my.id/contact",
      lastModified: new Date(),
    },
    ...blogEntries,
  ];
}
