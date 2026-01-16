import Link from "next/link";
import { Download, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAButtonsProps {
  showDownload?: boolean;
  showContact?: boolean;
  className?: string;
}

export function CTAButtons({
  showDownload = true,
  showContact = true,
  className,
}: CTAButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {showDownload && (
        <Button size="lg" className="group" asChild>
          <a href="/Software_Engineer.pdf" download>
            <Download className="h-4 w-4" />
            Download CV
            <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          </a>
        </Button>
      )}
      {showContact && (
        <Button variant="secondary" size="lg" className="group" asChild>
          <Link href="/contact">
            <Mail className="h-4 w-4" />
            Contact Me
          </Link>
        </Button>
      )}
    </div>
  );
}
