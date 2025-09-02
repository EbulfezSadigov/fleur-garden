import Container from "@/components/shared/container";
import Link from "next/link";

export default function PartnersPage() {
  return (
    <div className="py-9">
      <Container>
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Tarafdaşlarımız</h1>
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
          {Array.from({ length: 8 }, (_, i) => (
            <Link key={i} href={`/partners/${i}`} className="flex items-center justify-center py-12"
              style={{
                borderRadius: "12px",
                border: "1px solid #F2F4F8",
                background: "#FFF",
                boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
              }}
            >
              <div className="text-4xl font-serif text-black tracking-wide">DIOR</div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
