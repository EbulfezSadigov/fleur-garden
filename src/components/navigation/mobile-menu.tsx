"use client"

import React, { useState } from "react"
import { Search, ShoppingCart, Heart, Scale, X, ChevronRight, Menu, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { navigationItems } from "@/utils/static"
import { useTranslations, useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { routing } from "@/i18n/routing"
import Link from "next/link"
import UserPopover from "../shared/user-popover"

interface MobileMenuProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
  const t = useTranslations("navigation")
  const router = useRouter()
  const pathname = usePathname()
  const activeLocale = useLocale()
  const searchParams = useSearchParams()

  // State for managing subcategory view
  const [currentView, setCurrentView] = useState<'main' | 'subcategory'>('main')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const catalogItems = [
    { 
      label: "Qadın Parfumları", 
      href: "#",
      subcategories: [
        "Təravətli (Fresh)",
        "Çiçəkli (Floral)",
        "Meyvəli (Fruity)",
        "Ağaclı (Woody)",
        "Orient (Oriental)",
        "Müasir (Modern)"
      ]
    },
    { 
      label: "Kişi Parfumları", 
      href: "#",
      subcategories: [
        "Təravətli (Fresh)",
        "Ağaclı (Woody)",
        "Orient (Oriental)",
        "Spors (Sport)",
        "Klassik (Classic)",
        "Müasir (Modern)"
      ]
    },
    { 
      label: "Unisex Parfumları", 
      href: "#",
      subcategories: [
        "Təravətli (Fresh)",
        "Çiçəkli (Floral)",
        "Ağaclı (Woody)",
        "Orient (Oriental)",
        "Meyvəli (Fruity)",
        "Müasir (Modern)"
      ]
    },
    { 
      label: "Mini & Travel Ölçülər", 
      href: "#",
      subcategories: [
        "Qadın Mini",
        "Kişi Mini",
        "Unisex Mini",
        "Travel Set",
        "Sample Set",
        "Gift Set"
      ]
    },
    { 
      label: "Lüks Brendlər", 
      href: "#",
      subcategories: [
        "Chanel",
        "Dior",
        "Tom Ford",
        "Yves Saint Laurent",
        "Giorgio Armani",
        "Versace"
      ]
    },
    { 
      label: "Endirimli Məhsullar", 
      href: "#",
      subcategories: [
        "50% Endirim",
        "30% Endirim",
        "20% Endirim",
        "Kombo Təkliflər",
        "Sezonlu Endirimlər",
        "Son Günlər"
      ]
    },
  ]

  const locales = routing.locales

  function handleLanguageSelect(nextLocale: string) {
    const query = Object.fromEntries(searchParams.entries())
    router.replace({ pathname, query }, { locale: nextLocale })
  }

  function handleCategoryClick(categoryLabel: string) {
    setSelectedCategory(categoryLabel)
    setCurrentView('subcategory')
  }

  function handleBackToMain() {
    setCurrentView('main')
    setSelectedCategory(null)
  }

  function handleSubcategoryClick(subcategory: string) {
    // Handle subcategory navigation here
    console.log(`Selected subcategory: ${subcategory} from ${selectedCategory}`)
    // You can add navigation logic here
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-0 [&>button]:hidden">
        {/* Mobile Menu Header */}
        <div className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="p-1">
                <X className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Fleur Garden</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Scale className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Heart className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
              </Button>
              <UserPopover/>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-3 relative">
            <Input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-4 overflow-scroll">
          {/* Language Selector */}
          <div className="flex gap-2 mb-6">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageSelect(locale)}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  activeLocale === locale ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-4 mb-8">
            {navigationItems.map((item, index) => (
              <Link key={index} href={item.href} className="block text-gray-700 text-lg py-2">
                {t(item.label)}
              </Link>
            ))}
          </div>

          {/* Catalog Section */}
          <div>
            {currentView === 'main' ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Kataloq</h3>
                <div className="space-y-3">
                  {catalogItems.map((item, index) => (
                    <button 
                      key={index}
                      onClick={() => handleCategoryClick(item.label)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Subcategory Header with Back Button */}
                <div className="flex items-center gap-3 mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToMain}
                    className="p-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <h3 className="text-lg font-semibold">{selectedCategory}</h3>
                </div>
                
                {/* Subcategory List */}
                <div className="space-y-2">
                  {selectedCategory && catalogItems.find(item => item.label === selectedCategory)?.subcategories.map((subcategory, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubcategoryClick(subcategory)}
                      className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{subcategory}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
