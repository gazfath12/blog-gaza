import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Search, Filter } from "lucide-react";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      AND: [
        category ? { category: { equals: category } } : {},
        q ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { content: { contains: q, mode: 'insensitive' } },
          ]
        } : {},
      ]
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Articles</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, tutorials, and insights on software engineering and technology.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 border-b pb-8">
          <div className="flex flex-wrap gap-2">
            {["All", "Coding", "AI", "Backend", "Frontend", "Career", "Tech"].map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/blog" : `/blog?category=${cat}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  (category === cat || (!category && cat === "All"))
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <form action="/blog" method="GET">
              <input
                name="q"
                type="text"
                placeholder="Search articles..."
                defaultValue={q}
                className="w-full rounded-md border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>
          </div>
        </div>

        {/* Post List */}
        <div className="grid gap-12 py-12">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="flex flex-col gap-6 md:flex-row md:items-start group">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <span className="text-primary font-bold">{post.category}</span>
                    <span>•</span>
                    <span>{formatDate(post.createdAt)}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-bold transition-colors group-hover:text-primary sm:text-3xl">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="line-clamp-3 text-lg text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-foreground hover:underline"
                    >
                      Read full article →
                    </Link>
                  </div>
                </div>
                
                {post.thumbnail && (
                  <div className="w-full md:w-1/3 aspect-[16/10] overflow-hidden rounded-xl border bg-muted">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No articles found.</p>
              <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">Clear filters</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
