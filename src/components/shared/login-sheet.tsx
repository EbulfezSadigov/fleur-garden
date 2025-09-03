"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { useTranslations } from "next-intl"

interface LoginSheetProps {
  isOpen: boolean
  isAnimating: boolean
  onClose: () => void
  onOpenRegister?: () => void
}

export function LoginSheet({ isOpen, isAnimating, onClose, onOpenRegister }: LoginSheetProps) {
  const [showPassword, setShowPassword] = useState(false)
  const t = useTranslations("navigation")

  return (
    <>
      {/* Custom Modal/Overlay */}
      {isOpen && (
        <>
          {/* Backdrop/Overlay */}
          <div 
            className="fixed inset-0 z-40 top-[140px] bg-[#20201E85]"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <div className={`fixed right-0 h-[calc(100vh-140px)] top-auto bottom-0 w-full max-w-[400px] bg-white z-50 px-8 py-8 flex flex-col transform transition-transform duration-300 ease-out ${
            isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Header */}
            <div className="text-left mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                {t("login")}
              </h2>
            </div>
            
            {/* Login Form */}
            <div className="flex-1 space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email adresinizi qeyd edin"
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Şifrə
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrənizi daxil edin"
                    className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Şifrəni yadda saxla
                  </Label>
                </div>
                <button className="text-sm text-primary hover:text-primary/80">
                  Şifrəmi unutdum
                </button>
              </div>

              {/* Login Button */}
              <Button 
                className="w-full h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium"
                onClick={onClose}
              >
                {t("login")}
              </Button>

              {/* Register Link */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Hesabın yoxdur?{" "}
                </span>
                <button 
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                  onClick={onOpenRegister}
                >
                  Qeydiyyatdan keç
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// Export the hook to control the sheet
export function useLoginSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [closeTimeoutId, setCloseTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId)
      setCloseTimeoutId(null)
    }
    setIsOpen(true)
    setIsAnimating(false)
  }

  const handleClose = () => {
    setIsAnimating(false)
    const timeoutId = setTimeout(() => {
      setIsOpen(false)
      setCloseTimeoutId(null)
    }, 300)
    setCloseTimeoutId(timeoutId)
  }

  const handleToggle = () => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen()
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      setTimeout(() => setIsAnimating(true), 10)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId)
      }
    }
  }, [closeTimeoutId])

  return {
    isOpen,
    isAnimating,
    handleOpen,
    handleClose,
    handleToggle
  }
}
