import { ArrowRight, Code, Heart, Sparkles, Terminal } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-4xl">
      <div className="flex flex-col space-y-16">
        <section className="flex flex-col space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Hi, I'm <span className="text-blue-600">Gaza Alfath</span>.
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            I'm a Software Engineer and Tech Enthusiast based in Indonesia. I specialize in building full-stack applications with a focus on clean code, performance, and user experience.
          </p>
        </section>

        <div className="grid gap-12 md:grid-cols-2">
          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <Code size={24} />
              <h2 className="text-2xl font-bold">What I Do</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently, I focus on the JavaScript ecosystem, especially Next.js and Node.js. I'm also deeply interested in AI and how it can be integrated into modern web workflows to create more intuitive experiences.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <Heart size={24} />
              <h2 className="text-2xl font-bold">My Passion</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I love sharing what I learn through writing. This blog is my digital garden where I document my technical journey, experiments, and career insights to help other developers grow.
            </p>
          </section>
        </div>

        <section className="rounded-3xl bg-muted p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <div className="flex items-center space-x-2 text-primary font-bold uppercase tracking-widest text-xs">
                <Sparkles size={16} />
                <span>Let's collaborate</span>
              </div>
              <h2 className="text-3xl font-bold">Interested in working together or just want to say hi?</h2>
              <p className="text-lg text-muted-foreground">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
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
