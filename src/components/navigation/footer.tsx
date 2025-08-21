import { Instagram, Linkedin, Twitter, Dribbble, Globe } from "lucide-react"
import Container from "../shared/container"
import { navigationItems } from "@/utils/static"
import { useTranslations } from "next-intl"
import Link from "next/link"

export default function Footer() {
  const t = useTranslations("navigation")
  return (
    <footer className="bg-black text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Fleur Garden</h2>
            <p className="text-gray-400 mb-6">Bizi izləyin</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Dribbble size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe size={20} />
              </Link>
            </div>
          </div>

          {/* Business Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business</h3>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Nizami rayonu, Bakı, Azərbaycan</li>
              <li>
                <Link href="mailto:info@fleurgarden.com" className="text-gray-400 hover:text-white transition-colors">
                  info@fleurgarden.com
                </Link>
              </li>
              <li>
                <Link href="tel:+994777777770" className="text-gray-400 hover:text-white transition-colors">
                  +994 777 77 70
                </Link>
              </li>
              <li>
                <Link href="tel:+994777777770" className="text-gray-400 hover:text-white transition-colors">
                  +994 777 77 70
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
            <span className="mr-2">©</span>
            <span>Copyright | All Rights Reserved</span>
          </div>
          <div className="text-gray-400 text-sm">Markup tərəfindən hazırlanıb</div>
        </div>
      </Container>
    </footer>
  )
}
