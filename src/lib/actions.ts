"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function savePost(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const published = formData.get("published") === "true";
  const tagsString = formData.get("tags") as string;
  const tags = tagsString ? tagsString.split(",").map(t => t.trim()) : [];
  const readingTime = formData.get("readingTime") as string;
  const thumbnail = formData.get("thumbnail") as string;

  if (id) {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        published,
        tags,
        readingTime,
        thumbnail,
      },
    });
  } else {
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        published,
        tags,
        readingTime,
        thumbnail,
      },
    });
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
}
