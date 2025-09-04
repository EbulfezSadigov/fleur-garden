"use client"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"

interface InstagramShareButtonProps {
  shareUrl?: string
}

export function InstagramShareButton({ shareUrl }: InstagramShareButtonProps) {
  async function handleClick() {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch (_) {
      // ignore clipboard errors; still attempt to open instagram
    }
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer")
  }

  return (
    <Button onClick={handleClick} variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={!shareUrl} aria-label="Instagram-da paylaş">
      <Instagram className="w-4 h-4" />
      <span className="sr-only">Instagram-da paylaş</span>
    </Button>
  )
}


