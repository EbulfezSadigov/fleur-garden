"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useTranslations } from "next-intl"

export default function NotificationSettings() {
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(true)

  const t = useTranslations("notifications")

  return (
    <div className="col-span-3 lg:pl-8 lg:px-6 mt-5 lg:mt-0 space-y-6">
      <h1
      style={{
        borderRadius: "8px",
        border: "1px solid #F2F4F8",
        background: "#FFF",
        boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
      }}
      className="text-xl font-medium text-gray-900 p-4">{t("notifications")}</h1>

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
          <h2 className="text-xl font-medium text-gray-900">{t("notification_selection")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("notification_selection_description")}
          </p>
        </section>

        {/* Mesaj Bildirişləri */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium text-gray-900">{t("message_notifications")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("message_notifications_description")}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">{t("phone")} : 0705555555</span>
              <Switch
                checked={systemNotifications}
                onCheckedChange={setSystemNotifications}
                className="data-[state=checked]:bg-green-500 w-14 h-8"
                thumbClassName="w-7 h-7"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">{t("email")} : mmmm@gmail.com</span>
              <Switch
                checked={messageNotifications}
                onCheckedChange={setMessageNotifications}
                className="data-[state=checked]:bg-green-500 w-14 h-8"
                thumbClassName="w-7 h-7"
              />
            </div>
          </div>
        </section>

        {/* Sistem Bildirişləri */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium text-gray-900">{t("system_notifications")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("system_notifications_description")}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">{t("phone")} : 0705555555</span>
              <Switch
                checked={systemNotifications}
                onCheckedChange={setSystemNotifications}
                className="data-[state=checked]:bg-green-500 w-14 h-8"
                thumbClassName="w-7 h-7"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">{t("email")} : mmmm@gmail.com</span>
              <Switch
                checked={systemNotifications}
                onCheckedChange={setSystemNotifications}
                className="data-[state=checked]:bg-green-500 w-14 h-8"
                thumbClassName="w-7 h-7"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
