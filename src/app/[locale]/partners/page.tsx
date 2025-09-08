import Container from "@/components/shared/container";
import { getPartnersQuery } from "@/services/home/queries";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getServerLocale } from "@/lib/utils";
import { getServerQueryClient } from "@/providers/server";
import { getTranslations } from "next-intl/server";

export default async function PartnersPage() {
  const locale = await getServerLocale();
  const t = await getTranslations("navigation");
  const queryClient = getServerQueryClient();

  await Promise.all([queryClient.prefetchQuery(getPartnersQuery(locale))]);
  const partnersData = queryClient.getQueryData(getPartnersQuery(locale).queryKey);
  const partners = partnersData?.data;

  return (
    <div className="py-9">
      <Container>
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-[32px] font-semibold text-gray-900 mb-8">{t("partners")}</h1>
          <p className="text-gray-600 leading-relaxed text-base">
            Biz uzun illerdir etir sanayesində etibar və keyfiyyət prinsipləri ilə fəaliyyət göstəririk. Tarafdaşlarımız
            seçilən brendlərdən ibarət olub, hər biri öz sahəsində peşəkarlığı və yenilikçiliyi ilə tanınır. Birlikdə
            çalışdığımız markalar bizə güvənərək məhsullarımızın geniş kütləyə çatmasına dəstək olurlar. Onların dəstəyi
            və əməkdaşlığı sayəsində müştərilərimizə ən yaxşı seçimləri təqdim edə bilirik. Hər bir tarafdaşımızla
            qurduğumuz münasibətlər uzunmüddətli və etibarlı əsaslara söykənir. Biz keyfiyyət və müştəri məmnuniyyətini
            hər zaman ön planda tuturuq. Aşağıda təqdim olunan loqolar, etibarlı tarafdaşlarımızın yalnız bir hissəsini
            əks etdirir və onların hər biri ilə fəxr edirik.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
          {partners?.map((partner, i) => (
            <Link key={i} href={`/partners/${partner.slug}`} className="flex items-center justify-center py-12 relative group"
              style={{
                borderRadius: "12px",
                border: "1px solid #F2F4F8",
                background: "#FFF",
                boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
              }}
            >
              <div className="text-4xl font-serif text-black tracking-wide">{partner.name}</div>
              <ExternalLink className="w-4 h-4 absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
