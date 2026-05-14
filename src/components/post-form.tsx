"use client";

import { useState } from "react";
import { savePost } from "@/lib/actions";
import { Save, Eye, X, Image as ImageIcon, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function PostForm({ post }: { post?: any }) {
  const [content, setContent] = useState(post?.content || "");
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <form action={savePost} onSubmit={() => setLoading(true)} className="space-y-8">
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      
      <div className="flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 border-b">
        <h1 className="text-2xl font-bold">{post?.id ? "Edit Article" : "New Article"}</h1>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="inline-flex items-center px-4 py-2 rounded-lg border bg-background text-sm font-medium hover:bg-accent transition-all"
          >
            {isPreview ? <><X size={18} className="mr-2" /> Close Preview</> : <><Eye size={18} className="mr-2" /> Preview</>}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-lg hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            {loading ? "Saving..." : <><Save size={18} className="mr-2" /> Save Article</>}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Title</label>
            <input
              name="title"
              defaultValue={post?.title}
              required
              className="w-full text-3xl font-bold border-none bg-transparent focus:outline-none placeholder:text-muted-foreground/30"
              placeholder="Article Title..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Slug</label>
            <input
              name="slug"
              defaultValue={post?.slug}
              required
              className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="article-slug-example"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Content (Markdown)</label>
              <div className="text-xs text-muted-foreground flex items-center">
                <Sparkles size={12} className="mr-1" /> Markdown supported
              </div>
            </div>
            
            {!isPreview ? (
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={20}
                className="w-full rounded-xl border bg-background p-6 font-mono text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-y"
                placeholder="Write your article in markdown..."
              ></textarea>
            ) : (
              <div className="w-full rounded-xl border bg-card p-6 prose dark:prose-invert max-w-none min-h-[500px]">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-card p-6 space-y-6 shadow-sm">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Status</label>
              <select 
                name="published" 
                defaultValue={post?.published ? "true" : "false"}
                className="w-full rounded-lg border bg-background px-4 py-2 text-sm"
              >
                <option value="false">Draft</option>
                <option value="true">Published</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</label>
              <select 
                name="category" 
                defaultValue={post?.category || "Tech"}
                className="w-full rounded-lg border bg-background px-4 py-2 text-sm"
              >
                <option value="Coding">Coding</option>
                <option value="AI">AI</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="Career">Career</option>
                <option value="Tech">Tech</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Excerpt</label>
              <textarea
                name="excerpt"
                defaultValue={post?.excerpt}
                rows={3}
                className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Short summary for the list page..."
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground text-foreground flex items-center">
                <ImageIcon size={14} className="mr-1" /> Thumbnail URL
              </label>
              <input
                name="thumbnail"
                defaultValue={post?.thumbnail}
                className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="https://image-url.com/img.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Tags (comma separated)</label>
              <input
                name="tags"
                defaultValue={post?.tags?.join(", ")}
                className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="nextjs, react, tutorial"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Reading Time</label>
              <input
                name="readingTime"
                defaultValue={post?.readingTime || "5 min read"}
                className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="5 min read"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
