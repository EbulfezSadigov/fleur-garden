import Image from "next/image"
import { Clock, Facebook, Twitter, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPostHeaderProps {
  title: string
  heroImage: string
  readingTime: string
}

export function BlogPostHeader({ title, heroImage, readingTime }: BlogPostHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-[32px] font-semibold text-foreground mb-6 text-balance">{title}</h1>

      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-6">
        <Image src={heroImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      </div>

      <div className="flex items-center flex-wrap gap-4 pb-6 border-b">
        <div className="flex items-center gap-2 text-muted-foreground bg-[#F2F4F8] px-4 py-2 rounded-[8px]">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{readingTime}</span>
        </div>

        <div className="flex items-center gap-2 bg-[#F2F4F8] px-4 py-[3px] rounded-[8px]">
          <span className="text-sm text-muted-foreground mr-2">Paylaş:</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Facebook className="w-4 h-4" />
            <span className="sr-only">Facebook-da paylaş</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Twitter className="w-4 h-4" />
            <span className="sr-only">Twitter-də paylaş</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Link2 className="w-4 h-4" />
            <span className="sr-only">Linki kopyala</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
