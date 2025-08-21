"use client"

import { Search, ShoppingCart, Heart, Scale, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Container from "../shared/container"
import Link from "next/link"
import LanguageSelector from "../shared/language-selector"
import UserPopover from "../shared/user-popover"
import { CatalogDropdown } from "./catalog-dropdown"
import { navigationItems } from "@/utils/static"
import { useTranslations } from "next-intl"

export function Header() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const t = useTranslations("navigation")
  return (
    <header className="w-full bg-white border-b">
      {/* Top Navigation Bar */}
      <div>
        <Container className="pt-10">
          <div className="flex items-center pb-10 justify-between h-10 text-sm border-b border-[#F2F4F8]">
            <nav className="flex items-center space-x-6 font-medium">
              {navigationItems.map((item) => (
                <Link key={item.label} href={item.href} className="text-[#77777B] hover:text-gray-900">
                  {t(item.label)}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <div className="w-px h-4 bg-[#F2F4F8]" />
              <UserPopover />
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <Container>
        <div className="flex items-center justify-between h-[84px]">
          <div className="flex items-center gap-8">
            {/* Brand Name */}
            <div className="flex items-center">
              <h1 className="text-[32px] font-semibold text-primary">Fleur Garden</h1>
            </div>

            {/* Catalog Button */}
            <div className="flex items-center ml-8 border border-[#F2F4F8] rounded-[8px]">
              <Button
                variant="ghost"
                onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                {isCatalogOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <span>{t("catalog")}</span>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-[500px] mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-12 h-12 py-4 border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-8 h-8 p-0 hover:bg-gray-800"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Heart className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Scale className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </Container>

      {/* Catalog Dropdown */}
      <CatalogDropdown 
        isOpen={isCatalogOpen} 
        onClose={() => setIsCatalogOpen(false)} 
      />
    </header>
  )
}