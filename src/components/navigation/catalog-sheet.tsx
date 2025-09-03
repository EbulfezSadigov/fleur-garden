"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, ChevronRight} from "lucide-react"
import { useTranslations } from "next-intl"

interface Category {
  id: string
  name: string
  subcategories: string[]
}

const categories: Category[] = [
  {
    id: "women",
    name: "Qadın Parfumları",
    subcategories: [
      "Çiçək Notaları",
      "Meyvəli Notalar", 
      "Şərq/Oriental Notalar",
      "Odunsu Notalar",
      "Təravətli (Fresh)",
      "Ən çox satılanlar"
    ]
  },
  {
    id: "men",
    name: "Kişi Parfumları",
    subcategories: [
      "Odunsu Notalar",
      "Təravətli (Fresh)",
      "Şərq/Oriental Notalar",
      "Meyvəli Notalar",
      "Ən çox satılanlar"
    ]
  },
  {
    id: "unisex",
    name: "Unisex Parfumları",
    subcategories: [
      "Çiçək Notaları",
      "Odunsu Notalar",
      "Təravətli (Fresh)",
      "Meyvəli Notalar",
      "Ən çox satılanlar"
    ]
  },
  {
    id: "mini",
    name: "Mini & Travel Ölçülər",
    subcategories: [
      "Qadın Parfumları",
      "Kişi Parfumları",
      "Unisex Parfumları",
      "Ən çox satılanlar"
    ]
  },
  {
    id: "luxury",
    name: "Lüks Brendlər",
    subcategories: [
      "Qadın Lüks Parfumları",
      "Kişi Lüks Parfumları",
      "Unisex Lüks Parfumları",
      "Ən çox satılanlar"
    ]
  },
  {
    id: "discounted",
    name: "Endirimli Məhsullar",
    subcategories: [
      "Qadın Endirimli",
      "Kişi Endirimli",
      "Unisex Endirimli",
      "Ən çox satılanlar"
    ]
  }
]

export function CatalogSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories[0])
  const [closeTimeoutId, setCloseTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const t = useTranslations("navigation")

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category)
  }

  const handleToggle = () => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen()
    }
  }

  const handleOpen = () => {
    // Clear any pending close timeout
    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId)
      setCloseTimeoutId(null)
    }
    
    setIsOpen(true)
    setIsAnimating(false) // Start with false to ensure it mounts in initial position
  }

  const handleClose = () => {
    setIsAnimating(false)
    // Delay closing to allow animation to complete
    const timeoutId = setTimeout(() => {
      setIsOpen(false)
      setSelectedCategory(null)
      setCloseTimeoutId(null)
    }, 300) // Match animation duration
    
    setCloseTimeoutId(timeoutId)
  }

  // Handle escape key and animation timing
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      // Trigger animation after mount
      setTimeout(() => setIsAnimating(true), 10)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId)
      }
    }
  }, [closeTimeoutId])

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 border border-[#F2F4F8] rounded-[8px]"
        onClick={handleToggle}
      >
        <Menu className="w-5 h-5" />
        <span>{t("catalog")}</span>
      </Button>
      
      {/* Custom Modal/Overlay */}
      {isOpen && (
        <>
          {/* Backdrop/Overlay */}
          <div 
            className="fixed inset-0 top-[140px] bg-[#20201E85] z-40"
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <div className={`fixed left-0 h-[calc(100vh-140px)] top-auto bottom-0 w-full max-w-[714px] bg-white z-50 px-6 flex flex-col transform transition-transform duration-300 ease-out ${
            isAnimating ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Header - Hidden */}
            <div className="text-left">
              <h2 className="text-2xl hidden font-semibold text-gray-900">
                {t("catalog")}
              </h2>
            </div>
            
            {/* Catalog Content */}
            <div className="flex flex-1 gap-6 mt-6 overflow-hidden">
              {/* Main Categories */}
              <div className="flex-1 space-y-2 overflow-y-auto">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedCategory?.id === category.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-categories */}
              <div className="flex-1 space-y-2 overflow-y-auto">
                {selectedCategory ? (
                  <>
                    {/* Back button and category title */}
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedCategory.name}
                      </h3>
                    </div>
                    
                    {/* Subcategories list */}
                    <div className="space-y-2">
                      {selectedCategory.subcategories.map((subCategory, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <span className="text-gray-700">{subCategory}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-center">
                      Kategori seçin
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
