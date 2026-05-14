import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-muted-foreground">
              © {new Date().getFullYear()} Gaza Alfath. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="https://github.com/gazfath12" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </Link>
            <Link href="https://twitter.com/gazfath12" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="https://linkedin.com/in/gaza-alfath-0830982a9/" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </Link>
            <Link href="mailto:gazfath12@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
