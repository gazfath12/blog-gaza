import { ArrowRight, Code, Heart, Sparkles, Terminal } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-4xl">
      <div className="flex flex-col space-y-16">
        <section className="flex flex-col space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            The Digital Garden of <span className="text-blue-600">Gaza Alfath</span>.
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            I'm a Software Engineer who loves to explore the boundaries of AI, Web Performance, and Scalable Architecture. This blog is my space for technical storytelling.
          </p>
        </section>

        <div className="grid gap-12 md:grid-cols-2">
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <Sparkles size={24} />
              <h2 className="text-2xl font-bold">Why I Write</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In an industry that moves as fast as tech, writing is how I slow down and truly understand complex concepts. I believe that the best way to master a tool is to teach it to others through clear, insightful articles.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <Heart size={24} />
              <h2 className="text-2xl font-bold">What to Expect</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              You'll find deep dives into the JavaScript ecosystem, AI integrations, and architectural patterns. I aim for technical depth while maintaining a narrative that makes complex topics accessible and engaging.
            </p>
          </section>
        </div>

        <section className="rounded-3xl bg-muted p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">Join the Conversation</h2>
              <p className="text-lg text-muted-foreground">
                Whether you have a question about an article, want to suggest a topic, or just want to chat about the future of tech, I'd love to hear from you.
              </p>
              <a 
                href="/contact" 
                className="inline-flex h-12 items-center justify-center rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative h-64 w-64 rounded-full border-8 border-background overflow-hidden bg-white shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                  <Terminal size={80} className="text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
