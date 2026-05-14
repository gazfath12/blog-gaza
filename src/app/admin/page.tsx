import prisma from "@/lib/prisma";
import { FileText, Eye, List, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const totalPosts = await prisma.post.count();
  const publishedPosts = await prisma.post.count({ where: { published: true } });
  const draftPosts = totalPosts - publishedPosts;
  
  // Get views sum
  const posts = await prisma.post.findMany({ select: { views: true } });
  const totalViews = posts.reduce((acc, curr) => acc + curr.views, 0);

  const stats = [
    { name: "Total Posts", value: totalPosts, icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Total Views", value: totalViews, icon: Eye, color: "text-green-600", bg: "bg-green-100" },
    { name: "Published", value: publishedPosts, icon: List, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Drafts", value: draftPosts, icon: FileText, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  const recentPosts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <Link 
          href="/admin/posts/new"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-lg hover:bg-primary/90"
        >
          <Plus size={18} className="mr-2" /> New Article
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Posts</h2>
        </div>
        <div className="divide-y">
          {recentPosts.map((post) => (
            <div key={post.id} className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold hover:text-primary transition-colors cursor-pointer">{post.title}</p>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground uppercase font-bold">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.published ? <span className="text-green-600">Published</span> : <span className="text-orange-600">Draft</span>}</span>
                  <span>•</span>
                  <span>{post.views} views</span>
                </div>
              </div>
              <Link 
                href={`/admin/posts/edit/${post.id}`}
                className="text-sm font-bold text-primary hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
          {recentPosts.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              No posts yet. Create your first one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
