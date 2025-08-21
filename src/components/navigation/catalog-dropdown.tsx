"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  label: string
  subcategories: { id: string; label: string; href: string }[]
}

const CATEGORIES: Category[] = [
  {
    id: "women",
    label: "Qadın Parfumları",
    subcategories: [
      { id: "flower", label: "Çiçək Notaları", href: "#" },
      { id: "fruit", label: "Meyvəli Notalar", href: "#" },
      { id: "oriental", label: "Şərq/Oriental Notalar", href: "#" },
      { id: "woody", label: "Odunsu Notalar", href: "#" },
      { id: "fresh", label: "Təravətli (Fresh)", href: "#" },
      { id: "bestsellers", label: "Ən çox satılanlar", href: "#" },
    ],
  },
  {
    id: "men",
    label: "Kişi Parfumları",
    subcategories: [
      { id: "woody", label: "Odunsu Notalar", href: "#" },
      { id: "fresh", label: "Təravətli (Fresh)", href: "#" },
      { id: "spicy", label: "Ətirli/Ədviyyatlı", href: "#" },
      { id: "oriental", label: "Şərq/Oriental Notalar", href: "#" },
      { id: "bestsellers", label: "Ən çox satılanlar", href: "#" },
    ],
  },
  {
    id: "unisex",
    label: "Unisex Parfumları",
    subcategories: [
      { id: "niche", label: "Niş Ətir Brendləri", href: "#" },
      { id: "citrus", label: "Sitrus Təravəti", href: "#" },
      { id: "green", label: "Yaşıl/Bitki Notaları", href: "#" },
      { id: "leather", label: "Dəri Notaları", href: "#" },
    ],
  },
  {
    id: "travel",
    label: "Mini & Travel Ölçülər",
    subcategories: [
      { id: "5ml", label: "5ml - 15ml", href: "#" },
      { id: "20ml", label: "20ml - 30ml", href: "#" },
      { id: "sets", label: "Səyahət Setləri", href: "#" },
    ],
  },
  {
    id: "luxury",
    label: "Lüks Brendlər",
    subcategories: [
      { id: "exclusive", label: "Eksklüziv Koleksiyalar", href: "#" },
      { id: "limited", label: "Limitli Buraxılışlar", href: "#" },
    ],
  },
  {
    id: "sale",
    label: "Endirimli Məhsullar",
    subcategories: [
      { id: "under50", label: "50%+ Endirim", href: "#" },
      { id: "lastchance", label: "Son Şans", href: "#" },
    ],
  },
]

interface CatalogDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function CatalogDropdown({ isOpen, onClose }: CatalogDropdownProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  if (!isOpen) return null
  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId) || null

  return (
    <div className="absolute left-0 w-1/2 bg-white border-b z-50 h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-8">
          {/* Left Column - Main Categories */}
          <div className="space-y-1">
            {CATEGORIES.map(category => {
              const isActive = category.id === activeCategoryId
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`w-full flex items-center gap-[102px] justify-between py-3 px-4 rounded-lg text-left transition-colors ${
                    isActive ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-900"
                  }`}
                >
                  <span className="font-semibold">{category.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? "text-gray-600" : "text-gray-400"}`} />
                </button>
              )
            })}
          </div>

          {/* Middle Column - Subcategories */}
          <div className="space-y-6">
            {activeCategory ? (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">{activeCategory.label}</h3>
                <div className="space-y-2 text-gray-600">
                  {activeCategory.subcategories.map(sub => (
                    <Link key={sub.id} href={sub.href} onClick={onClose} className="block hover:text-gray-900">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 select-none">Yuxarıdan bir kateqoriya seçin</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
