import { Mail, MessageSquare, Send, Twitter, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-5xl">
      <div className="grid gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight">Get in touch.</h1>
            <p className="text-xl text-muted-foreground">
              Have a question or want to work together? I'd love to hear from you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-xl border bg-card hover:border-primary transition-colors">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-lg font-bold">gazfath12@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-xl border bg-card hover:border-primary transition-colors">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Socials</p>
                <div className="flex space-x-4 mt-1">
                  <a href="https://twitter.com/gazfath12" className="hover:text-blue-600"><Twitter size={20} /></a>
                  <a href="https://github.com/gazfath12" className="hover:text-blue-600"><Github size={20} /></a>
                  <a href="https://linkedin.com/in/gaza-alfath-0830982a9/" className="hover:text-blue-600"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="How can I help you?"
                className="w-full rounded-lg border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex h-12 items-center justify-center rounded-lg bg-foreground text-background font-bold transition-all hover:bg-foreground/90 active:scale-95"
            >
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
