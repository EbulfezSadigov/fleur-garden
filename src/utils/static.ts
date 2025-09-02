import { Bell, UserCircle, LogOut, Package, HelpCircle } from "lucide-react"

export const navigationItems = [
  { label: "about_company", href: "/about" },
  { label: "partners", href: "/partners" },
  { label: "blog", href: "/blogs" },
  { label: "contact", href: "/contact" },
]

export const sidebarItems = [
  { icon: UserCircle, label: "Hesab məlumatları", href: "/profile" },
  { icon: Package, label: "Sifarişlər", href: "/profile/orders" },
  { icon: Bell, label: "Bildirişlər", href: "/profile/notifications"  },
  { icon: HelpCircle, label: "Yardım", href: "/profile/help" },
  { icon: LogOut, label: "Hesabdan çıxış" },
]