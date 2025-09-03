import Container from "@/components/shared/container"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="py-9">
      <Container>
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 items-start gap-12 mb-20">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold text-foreground text-balance">Şirketimiz haqqında</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Biz, müştərilərimizə ən yüksək keyfiyyətli ətirlari təqdim etməyi hədəfləyən bir şirkətik. Parfüm
              seçiminin insanların gündəlik həyatında xüsusi bir yer tutduğunu bilirik. Məhsullarımız dünyaca məşhur
              brendlərdən ibarətdir və hər biri dəqiq seçilmişdir. Biz, həm kişilər, həm də qadınlar üçün geniş çeşiddə
              ətir növləri təqdim edirik. Məqsədimiz, hər istifadəçinin öz şəxsiyyətini ifadə edən bir ətir tapmasına
              kömək etməkdir. Müştəri məmnuniyyəti bizim üçün hər şeydən önəmlidir. Bütün məhsullarımız orijinaldır və
              etibarlı təminatlarla satılır. Biz daimi olaraq bazardakı yeniliklari izləyir və ən son trend ətirlari
              təqdim edirik. Komandamız peşəkar və ətir sahəsində təcrübəlidir. Bizimle alış-veriş etmək rahat və
              sürətlidir. Online platformamız istifadəçilər üçün asan naviqasiya təmin edir. Müştərilərimizə fərdi
              təkliflər və endirim imkanları təqdim edirik. Ətir seçimi zamanı hər detal diqqətlə düşünürük. Məqsədimiz,
              hər alış-verişi unudulmaz bir təcrübəyə çevirmekdir. Biz həm yerli, həm də beynəlxalq bazarda tanınmaq
              üçün çalışırıq.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end h-[384px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/about.jpg"
              alt="Elegant perfume bottle"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Mission and Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground mb-8 text-balance">Missiyamız və Dəyərlərimiz</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              Missiyamız, insanların gündəlik həyatını ətirlarlə zənginləşdirməkdir. Biz müştərilərimizin fərdi
              zövqlərini hörmətlə yanaşırıq. Keyfiyyət və etibarlılıq şirkətimizin əsas dəyərləridir. Hər məhsulun
              orijinallığı və təravəti bizim üçün önəmlidir. Biz müasir texnologiyalardan istifadə edərək,
              müştərilərimizə ən yaxşı xidmət göstəririk. Ətir seçimi prosesi asan və yeniliklər. Komandamız kreativ və
              yenilikçi yanaşmalarla çalışır. Biz, eyni zamanda ekoloji məsuliyyətə önəm veririk və dayanıqlı
              prinsiplərə sadiqik.
            </p>
            <p className="text-lg">
              Müştərilərimizlə uzunmüddətli əlaqələr qurmaq üçün çalışırıq. Biz daim inkişaf edən bir şirkətik və bazar
              tələblərinə uyğunlaşırıq. Ətir dünyasındakı ən son trend və yeniliklər izləyirik. Hər bir müştəriyə fərdi
              yanaşma göstərmək bizim üçün vacibdir. Məqsədimiz, hər istifadəçinin özünə uyğun mükəmməl ətiri tapmasına
              kömək etməkdir. Bizim dəyərlərimiz şəffaflıq, keyfiyyət və innovasiyadır. Müştərilərimizin məmnuniyyəti
              hər zaman prioritetimizdir.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 border-y border-[#F2F4F8] py-8">
          <div className="space-y-4">
            <div className="flex">
              <Image src="/svgs/package.svg" alt="Package" width={32} height={36} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Sürətli Çatdırılma</h3>
            <p className="text-muted-foreground">
              Sifarişiniz evinizə sürətli və təhlükəsiz şəkildə çatdırılır, alış-veriş təcrübəniz rahat olur.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex">
              <Image src="/svgs/check-circle.svg" alt="Check Circle" width={36} height={36} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Geniş seçim imkanı</h3>
            <p className="text-muted-foreground">
              Kişi, qadın və uniseks ətirlərindən ibarət zəngin çeşid ilə hər zövqə uyğun məhsul tapın.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex">
              <Image src="/svgs/award.svg" alt="Award" width={36} height={36} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Keyfiyyət Zəmanəti</h3>
            <p className="text-muted-foreground">
              Bütün ətirlərımız tam orijinaldır və etibarlı təminatlarla təqdim olunur.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
