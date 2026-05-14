const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gazaalfath.my.id' },
    update: {},
    create: {
      email: 'admin@gazaalfath.my.id',
      name: 'Gaza Alfath',
      password: 'password123', // In real app, use bcrypt to hash
      role: 'ADMIN',
    },
  });

  console.log({ admin });

  // Create some dummy posts
  const post1 = await prisma.post.upsert({
    where: { slug: 'welcome-to-my-blog' },
    update: {},
    create: {
      title: 'Welcome to My New Blog',
      slug: 'welcome-to-my-blog',
      content: `
# Welcome!

This is my first post on my new blog. I'm Gaza Alfath, a Software Engineer and Fullstack Developer.

In this blog, I will share my journey in:
- AI development
- Modern Frontend with Next.js
- Robust Backend with Node.js and Go
- Career tips for developers

Stay tuned for more!
      `,
      excerpt: 'Welcome to my official personal blog where I share my thoughts on tech and career.',
      published: true,
      category: 'Tech',
      tags: ['intro', 'tech', 'career'],
      readingTime: '2 min read',
    },
  });

  const post2 = await prisma.post.upsert({
    where: { slug: 'mastering-nextjs-app-router' },
    update: {},
    create: {
      title: 'Mastering Next.js App Router',
      slug: 'mastering-nextjs-app-router',
      content: `
Next.js App Router is the future of React development. It provides built-in support for:
- Server Components
- Streaming
- Nested Layouts
- Data Fetching patterns

Let's dive deep into how to optimize your Next.js application.
      `,
      excerpt: 'Learn how to leverage the power of Next.js App Router for high-performance web applications.',
      published: true,
      category: 'Frontend',
      tags: ['nextjs', 'react', 'frontend'],
      readingTime: '5 min read',
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
