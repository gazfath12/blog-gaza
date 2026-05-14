import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, Share2, Twitter, Linkedin, Link as LinkIcon, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt || "Article by Gaza Alfath",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Article by Gaza Alfath",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: ["Gaza Alfath"],
      images: post.thumbnail ? [post.thumbnail] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "Article by Gaza Alfath",
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Update view count (simple implementation)
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  const relatedPosts = await prisma.post.findMany({
    where: {
      category: post.category,
      NOT: { id: post.id },
      published: true,
    },
    take: 2,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.thumbnail,
    "datePublished": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "author": {
      "@type": "Person",
      "name": "Gaza Alfath",
      "url": "https://gazaalfath.my.id/about"
    }
  };

  return (
    <article className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to articles
      </Link>

      {/* Header */}
      <header className="flex flex-col space-y-8 mb-12">
        <div className="flex items-center space-x-3">
          <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="text-muted-foreground text-xs flex items-center">
              <Tag size={12} className="mr-1" /> {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y py-6">
          <div className="flex items-center">
            <Calendar size={18} className="mr-2" />
            <span className="text-sm font-medium">{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="mr-2" />
            <span className="text-sm font-medium">{post.readingTime || '5 min read'}</span>
          </div>
          <div className="flex items-center ml-auto">
            <button className="p-2 hover:bg-accent rounded-full transition-colors" title="Share on Twitter">
              <Twitter size={18} />
            </button>
            <button className="p-2 hover:bg-accent rounded-full transition-colors" title="Share on LinkedIn">
              <Linkedin size={18} />
            </button>
            <button className="p-2 hover:bg-accent rounded-full transition-colors" title="Copy link">
              <LinkIcon size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.thumbnail && (
        <div className="w-full aspect-video mb-12 rounded-2xl overflow-hidden border">
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="article-content prose dark:prose-invert max-w-none prose-lg">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <div className="relative group">
                   <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-2 py-1 rounded border border-white/20">
                      Copy
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-xl !mt-0"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Footer / Related */}
      <footer className="mt-24 border-t pt-12">
        <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
        <div className="grid gap-8 md:grid-cols-2">
          {relatedPosts.map((related) => (
            <Link
              key={related.id}
              href={`/blog/${related.slug}`}
              className="group flex flex-col space-y-3 p-4 rounded-xl border hover:border-primary transition-all"
            >
              <span className="text-xs font-bold text-primary uppercase">{related.category}</span>
              <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{related.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
            </Link>
          ))}
          {relatedPosts.length === 0 && <p className="text-muted-foreground italic">No related articles yet.</p>}
        </div>
      </footer>
    </article>
  );
}
