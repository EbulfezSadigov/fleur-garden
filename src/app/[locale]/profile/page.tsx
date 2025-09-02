"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function ProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="col-span-3 lg:pl-8 h-full mt-5 lg:mt-0">
      <h1 className="text-2xl font-semibold text-gray-900 mb-5 p-4 border border-[#F2F4F8]"
        style={{
          borderRadius: "8px",
          border: "1px solid #F2F4F8",
          background: "#FFF",
          boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
        }}>Hesabım & Yardım</h1>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Information */}
          <div className="py-7 px-6"
            style={{
              borderRadius: "8px",
              border: "1px solid #F2F4F8",
              background: "#FFF",
              boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
            }}
          >
            <div>
              <h1 className="text-lg font-medium text-gray-900">Hesab Məlumatları</h1>
            </div>
            <div className="space-y-4 flex flex-col h-full">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-gray-600">
                  Ad,soyad
                </Label>
                <Input id="name" defaultValue="Aysun Feyzullayeva" className="bg-gray-50 border-gray-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="aysunfeyzullayevauix@gmail.com"
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              <Button className="w-fit self-end bg-gray-900 hover:bg-gray-800 text-white mt-6">Yadda saxla</Button>
            </div>
          </div>

          {/* Password Reset */}
          <div
            className="py-7 px-6"
            style={{
              borderRadius: "8px",
              border: "1px solid #F2F4F8",
              background: "#FFF",
              boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
            }}
          >
            <div>
              <h1 className="text-lg font-medium text-gray-900">Şifrə Yenilənmə</h1>
            </div>
            <div className="space-y-4 flex flex-col h-full">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-sm text-gray-600">
                  Şifrə
                </Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Şifrenizi daxil edin"
                    className="bg-gray-50 border-gray-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm text-gray-600">
                  Yeni şifrə
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Yeni şifrenizi daxil edin"
                    className="bg-gray-50 border-gray-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm text-gray-600">
                  Şifrənin təkrarı
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Şifrenizi təkrar edin"
                    className="bg-gray-50 border-gray-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button className="w-fit self-end bg-gray-900 hover:bg-gray-800 text-white mt-6">Yadda saxla</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
