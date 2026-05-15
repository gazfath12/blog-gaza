import Link from "next/link";
import { ArrowRight, Code, Cpu, Database, Layout, Briefcase, Zap } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

const categories = [
  { name: "Coding", icon: Code, href: "/blog?category=Coding" },
  { name: "AI", icon: Cpu, href: "/blog?category=AI" },
  { name: "Backend", icon: Database, href: "/blog?category=Backend" },
  { name: "Frontend", icon: Layout, href: "/blog?category=Frontend" },
  { name: "Career", icon: Briefcase, href: "/blog?category=Career" },
  { name: "Tech", icon: Zap, href: "/blog?category=Tech" },
];

export default async function Home() {
  let latestPosts: any[] = [];
  
  try {
    latestPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Failed to fetch latest posts for homepage.");
  }

  return (
    <div className="flex flex-col space-y-24 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-sm font-medium">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Insights & Engineering
          </div>
          
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
            Technical <span className="text-blue-600">Deep Dives</span> for Modern Developers
          </h1>
          
          <p className="max-w-2xl text-xl font-medium text-muted-foreground sm:text-2xl">
            Exploring AI, Fullstack Architecture, and the Future of Web Development.
          </p>
          
          <p className="max-w-2xl text-lg text-muted-foreground">
            A digital space where I document my technical journey, share original insights from trending tech, and help developers stay ahead of the curve.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="/blog"
              className="inline-flex h-12 items-center justify-center rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Start Reading
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center rounded-md border bg-background px-8 text-sm font-medium transition-colors hover:bg-accent"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex flex-col items-center justify-center space-y-3 rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              <cat.icon className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Latest Articles</h2>
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline flex items-center">
            View all posts <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <article key={post.id} className="group flex flex-col space-y-4 rounded-2xl border bg-card p-6 transition-all hover:shadow-xl">
              <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              
              <Link href={`/blog/${post.slug}`} className="flex flex-col space-y-2">
                <h3 className="text-2xl font-bold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
              
              <div className="mt-auto pt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{formatDate(post.createdAt)}</span>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-primary inline-flex items-center">
                  Read more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
