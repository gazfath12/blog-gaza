import prisma from "@/lib/prisma";
import { Plus, Search, MoreHorizontal, Edit, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Articles</h1>
        <Link 
          href="/admin/posts/new"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold"
        >
          <Plus size={18} className="mr-2" /> Create Article
        </Link>
      </div>

      <div className="flex items-center space-x-4 border-b pb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search your articles..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold">{post.title}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[300px]">/{post.slug}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm px-2 py-1 bg-accent rounded-md font-medium">{post.category}</span>
                </td>
                <td className="px-6 py-4">
                  {post.published ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {formatDate(post.createdAt)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link 
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                    >
                      <ExternalLink size={18} />
                    </Link>
                    <Link 
                      href={`/admin/posts/edit/${post.id}`}
                      className="p-2 hover:bg-accent rounded-lg transition-colors text-blue-600"
                    >
                      <Edit size={18} />
                    </Link>
                    <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="p-20 text-center text-muted-foreground">
            No articles found. Start writing today!
          </div>
        )}
      </div>
    </div>
  );
}
