"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, Heart, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserPopover from "../shared/user-popover"
import LanguageSelector from "../shared/language-selector"
import { navigationItems } from "@/utils/static"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { CatalogSheet } from "./catalog-sheet"
import { MobileMenu } from "./mobile-menu"
import Container from "../shared/container"

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [comparisonCount, setComparisonCount] = useState(0)

  const t = useTranslations("navigation")

  useEffect(() => {
    const updateFavoritesCount = () => {
      if (typeof window !== 'undefined') {
        try {
          const favoritesData = localStorage.getItem('favorites')
          if (favoritesData) {
            const favorites = JSON.parse(favoritesData)
            setFavoritesCount(favorites.length)
          } else {
            setFavoritesCount(0)
          }
        } catch (error) {
          console.error('Failed to load favorites count', error)
          setFavoritesCount(0)
        }
      }
    }

    const updateComparisonCount = () => {
      if (typeof window !== 'undefined') {
        try {
          const comparisonData = localStorage.getItem('comparison')
          if (comparisonData) {
            const comparison = JSON.parse(comparisonData)
            setComparisonCount(comparison.length)
          } else {
            setComparisonCount(0)
          }
        } catch (error) {
          console.error('Failed to load comparison count', error)
          setComparisonCount(0)
        }
      }
    }

    updateFavoritesCount()
    updateComparisonCount()

    window.addEventListener('favoritesChanged', updateFavoritesCount)
    window.addEventListener('comparisonChanged', updateComparisonCount)
    window.addEventListener('storage', updateFavoritesCount)
    window.addEventListener('storage', updateComparisonCount)

    return () => {
      window.removeEventListener('favoritesChanged', updateFavoritesCount)
      window.removeEventListener('comparisonChanged', updateComparisonCount)
      window.removeEventListener('storage', updateFavoritesCount)
      window.removeEventListener('storage', updateComparisonCount)
    }
  }, [])

  return (
    <div>
      <header className="w-full bg-white border-b fixed z-50 top-0 left-0 right-0">
        <div className="hidden md:block">
          <Container>
            <div className="flex items-center py-3 justify-between text-sm border-b border-gray-200">
              <nav className="flex items-center space-x-6 font-medium">
                {navigationItems.map((item) => (
                  <Link key={item.label} href={item.href} className="text-gray-600 hover:text-gray-900">
                    {t(item.label)}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <div className="w-px h-4 bg-gray-200" />
                <UserPopover />
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="flex items-center justify-between h-[84px]">
            <div className="flex items-center gap-2 md:gap-8">
              <div className="md:hidden">
                <MobileMenu isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
              </div>

              <Link href="/" className="flex items-center">
                <h1 className="text-xl md:text-[32px] font-semibold text-black">Fleur Garden</h1>
              </Link>

              <div className="hidden md:block">
                <CatalogSheet />
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-[500px] mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-4 pr-12 h-12 py-4 border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 p-0 hover:bg-gray-800"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="p-2">
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
              <Link href="/favorites">
                <Button variant="ghost" size="sm" className="p-2 relative">
                  <Heart className="w-5 h-5 text-gray-600" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {favoritesCount > 99 ? '99+' : favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/comparison">
                <Button variant="ghost" size="sm" className="p-2 relative">
                  <Scale className="w-5 h-5 text-gray-600" />
                  {comparisonCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {comparisonCount > 99 ? '99+' : comparisonCount}
                    </span>
                  )}
                </Button>
              </Link>
              <div className="block md:hidden">
                <UserPopover />
              </div>
            </div>
          </div>
        </Container>
      </header>
    </div>
  )
}
