import Container from "@/components/shared/container";
import Image from "next/image";

interface PartnerPageProps {
  params: {
    locale: string;
    id: string;
  };
}

function formatPartnerName(id: string): string {
  if (!id) return "";
  const normalized = id.replace(/-/g, " ").trim();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export default function Partner({ params: { id } }: PartnerPageProps) {
  const partnerName = formatPartnerName(id || "dior");

  return (
    <div className="py-9">
      <Container>
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span className="hover:text-foreground transition-colors">Tərəfdaşlarımız</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">Dior</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-light text-gray-900 mb-8">Dior</h1>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="text-gray-700 leading-7 text-base space-y-4">
            <p>
              Bizim tərəfdaşımız {partnerName}, ətir və moda dünyasında uzun illərdir tanınan və
              yüksək keyfiyyəti ilə seçilən bir brenddir. {partnerName} yaradıldıqdan bəri
              müştərilərinə unikal və zərif ətirlər təqdim etməyi əsas məqsəd seçib.
            </p>
            <p>
              Brendin məhsulları yalnız etibarlı xammaldan hazırlanır və hər zaman innovativ
              yanaşmalarla zənginləşdirilir. {partnerName}-un əsas prinsipləri arasında kreativlik,
              etibar və davamlı inkişaf dayanır. Bizimlə əməkdaşlıq edərək, onların məhsullarını daha
              geniş auditoriyaya çatdırmaq mümkündür.
            </p>
            <p>
              Bu əməkdaşlıq hər iki tərəf üçün faydalı və uzunmüddətli münasibətlərin qurulmasına
              əsas yaradır.
            </p>
          </div>

          <div className="relative w-full">
            <div className="overflow-hidden h-[384px] rounded-2xl border border-[#F2F4F8] shadow-[0_8px_12px_rgba(0,0,0,0.03)]">
              <Image
                src="/images/about.jpg"
                alt={`${partnerName} cover`}
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}