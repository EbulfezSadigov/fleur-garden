"use client"

import { useRouter } from "@/i18n/navigation"
import { useCallback, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBoxProps {
  initialQuery?: string
  className?: string
}

export function SearchBox({ initialQuery = "", className }: SearchBoxProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const go = useCallback(() => {
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?search=${encodeURIComponent(trimmed)}`)
    setQuery("")
  }, [router, query])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      go()
      setQuery("")
    }
  }, [go])

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search"
        className="w-full pl-4 pr-12 h-12 py-4 border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
      <Button
        size="sm"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 p-0 hover:bg-gray-800"
        onClick={go}
        aria-label="search"
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  )
}


