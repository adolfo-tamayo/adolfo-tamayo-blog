import { ExternalLink, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { profile } from "@/data/profile"

const icons = {
  LinkedIn: ExternalLink,
  X: ExternalLink,
  Email: Mail,
}

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Contact links">
      {profile.links.map((link) => {
        const Icon = icons[link.label as keyof typeof icons]

        return (
          <Button key={link.href} asChild variant="outline" size="sm">
            <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
              {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
              {link.label}
            </a>
          </Button>
        )
      })}
    </div>
  )
}
