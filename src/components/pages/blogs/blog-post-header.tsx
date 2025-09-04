import Image from "next/image"
import { Clock, Linkedin, TwitterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InstagramShareButton } from "./instagram-share-button"

interface BlogPostHeaderProps {
  title: string
  heroImage: string
  readingTime: string
  shareUrl?: string
}

export function BlogPostHeader({ title, heroImage, readingTime, shareUrl }: BlogPostHeaderProps) {
  const encodedUrl = shareUrl ? encodeURIComponent(shareUrl) : undefined
  const encodedText = encodeURIComponent(title)
  const twitterHref = encodedUrl ? `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}` : undefined
  const linkedinHref = encodedUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` : undefined
  return (
    <header className="mb-6">
      <h1 className="text-3xl md:text-[32px] font-semibold text-foreground mb-6 text-balance">{title}</h1>

      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-6">
        <Image src={heroImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      </div>

      <div className="flex items-center flex-wrap gap-4 px-12">
        <div className="flex items-center gap-2 text-muted-foreground bg-[#F2F4F8] px-4 py-2 rounded-[8px]">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{readingTime} oxuma vaxtı</span>
        </div>

        <div className="flex items-center gap-2 bg-[#F2F4F8] px-4 py-[3px] rounded-[8px]">
          <span className="text-sm text-muted-foreground mr-2">Paylaş:</span>
          <InstagramShareButton shareUrl={shareUrl} />
          {linkedinHref ? (
            <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
              <a href={linkedinHref} target="_blank" rel="noopener noreferrer" aria-label="Linkedin-da paylaş">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
              <Linkedin className="w-4 h-4" />
              <span className="sr-only">Linkedin-da paylaş</span>
            </Button>
          )}
          {twitterHref ? (
            <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
              <a href={twitterHref} target="_blank" rel="noopener noreferrer" aria-label="Twitter-da paylaş">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
              <TwitterIcon className="w-4 h-4" />
              <span className="sr-only">Twitter-da paylaş</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
