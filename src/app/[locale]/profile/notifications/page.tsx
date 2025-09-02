"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export default function NotificationSettings() {
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(true)

  return (
    <div className="col-span-3 lg:pl-8 lg:px-6 mt-5 lg:mt-0 space-y-6">
      <h1
      style={{
        borderRadius: "8px",
        border: "1px solid #F2F4F8",
        background: "#FFF",
        boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
      }}
      className="text-2xl font-semibold text-gray-900 p-4">Bildirişlər</h1>

      <div className="space-y-8 py-9 px-8"
      style={{
        borderRadius: "8px",
        border: "1px solid #F2F4F8",
        background: "#FFF",
        boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
      }}
      >
        {/* Bildiriş seçimləri */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900">Bildiriş seçimləri</h2>
          <p className="text-gray-600 leading-relaxed">
            Felur Garden-dan almaq istədiyiniz bildirişləri seçin və özəlləşdirin
          </p>
        </section>

        {/* Mesaj Bildirişləri */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Mesaj Bildirişləri</h2>
          <p className="text-gray-600 leading-relaxed">
            Yeni sifarişlər, kampaniyalar və ya endirimlər barədə məlumatları SMS və email vasitəsilə alın.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Telefon : 0705555555</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Email : mmmm@gmail.com</span>
              <Switch
                checked={messageNotifications}
                onCheckedChange={setMessageNotifications}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </section>

        {/* Sistem Bildirişləri */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Sistem Bildirişləri</h2>
          <p className="text-gray-600 leading-relaxed">
            Hesabınız və sifarişlərinizlə bağlı yenilənmələri, təhlükəsizlik bildirişlərini və digər vacib məlumatları
            əldə edin.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Telefon : 0705555555</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Email : mmmm@gmail.com</span>
              <Switch
                checked={systemNotifications}
                onCheckedChange={setSystemNotifications}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
