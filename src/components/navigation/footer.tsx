import Container from "../shared/container"
import { navigationItems } from "@/utils/static"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getServerQueryClient } from "@/providers/server"
import { getContactQuery, getSocialsQuery } from "@/services/home/queries"
import Image from "next/image"

export default async function Footer() {
  const t = await getTranslations("navigation")
  const queryClient = getServerQueryClient();

  await Promise.all([queryClient.prefetchQuery(getContactQuery()), queryClient.prefetchQuery(getSocialsQuery())]);
  const contactData = queryClient.getQueryData(getContactQuery().queryKey);
  const contact = contactData?.data;
  const socialsData = queryClient.getQueryData(getSocialsQuery().queryKey);
  const socials = socialsData?.data;

  return (
    <footer className="bg-black text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Fleur Garden</h2>
            <p className="text-gray-400 mb-6">{t("watch_us")}</p>
            <div className="flex space-x-4">
              {socials?.map((social) => (
                <Link href={social.link} className="text-gray-400 hover:text-white transition-colors" key={social.name}>
                  <Image src={social.image || ""} alt={social.name} width={20} height={20} />
                </Link>
              ))}
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
              <li className="text-gray-400">{contact?.address}</li>
              <li>
                <Link href={`mailto:${contact?.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {contact?.email}
                </Link>
              </li>
              <li>
                <Link href={`tel:${contact?.phone}`} className="text-gray-400 hover:text-white transition-colors">
                  {contact?.phone}
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
