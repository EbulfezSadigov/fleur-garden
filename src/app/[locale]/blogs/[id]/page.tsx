import { BlogPostHeader } from "@/components/pages/blogs/blog-post-header"
import { BlogPostContent } from "@/components/pages/blogs/blog-post-content"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import Container from "@/components/shared/container"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Mock data - in a real app, this would come from a CMS or database
const getBlogPost = (slug: string) => {
  return {
    title: "Parfumun Qalıcı Olması Üçün 7 Məsləhət",
    heroImage: "/images/blog.jpg",
    readingTime: "6-7 deq. oxuma vaxtı",
    publishDate: "29.07.2025",
    content: {
      intro:
        "Parfumdan zövq almaq təkcə onun seçimi ilə bitmir. Düzgün qalıcı olması, gün boyu ətrə müsaiyət etməsi üçün düzgün istifadə qaydaları da çox vacibdir. Əks halda, bahalı və keyfiyyətli parfum belə qısa müddətdə təsirini itirə bilər. Bu yazıda parfumun qalıcı olmasına kömək edəcək üç əsas məsləhətə toxunacağıq.",
      sections: [
        {
          title: "Nabz Nöqtələrində Doğru Püskürtmə",
          content:
            "Ətrin güclü və qalıcılığını artırmağın ən sadə yolu onu nabz nöqtələrinə püskürtməkdir. Bədənimizdə bu hissələri qaba işıl olduğu üçün parfumun notları burada daha güclü və ya yayılır. Biləklər, boyun, qulaq arxası və dizlərin iç hissəsi bunur.\n\nVacibdir ki, parfumu verdiyiniz sonra həmin bölgələri bir-birinə sürtməyəsiniz. Bu hərəkət molekulları zədələyir və qoxunun ömrünü qısaldır. Əks yağ onu qoyduğunuz yerdə qoyun və təbii şəkildə qurumasına imkan verin. Amma əsasən çox yaxın tutmaq olmaz, çünki pərçəmə ətrə qala bilər.",
        },
        {
          title: "Parfumu Doğru Şəkildə Saxlama",
          content:
            "Ətrin qalıcı qalmasının başqa bir yolu isə onu düzgün saxlamaqdır. İsti və günəşli yerlərdə saxlanılan parfumlar çox tez keyfiyyətini itir və notları dəyişir. Ən ideal saxlama yeri serin, quru və günəşdən uzaq yerlərdə olmalıdır.\n\nParfum şüşəsinin qapağını hər istifadədən sonra möhkəm bağlamaq lazımdır. Hava ilə təmasın ətrini tərəkibini dəyişə bilər. Həmçinin sə ən yanlış seçimdir, çünki burada həm isti, həm də rütubətli çoxdur. Bu şəraitdə parfum çox qısa müddətdə öz təsirini itirir. Digər tərəfdən, soyuducuya qoymaq da düzgün deyil. Həddindən artıq soyuq da parfumun tərkibini dəyişə bilər və ətrin keyfiyyətini aşağı sala bilər - sevdiyiniz qoxu unu biraz əzizlik olar.",
        },
        {
          title: "Nəmləndirici ilə Effekti Gücləndirimək",
          content:
            "Dərinin vəziyyəti də parfumun qalıcı olmasında mühüm rol oynayır. Quru dəri qoxunu tez udar, nəticədə ətrə qısa müddətdə yox olar. Nəmləndirici dəri isə qoxunu daha uzun saxlayır. Buna görə də parfumu vurmazdan əvvəl nəyisə, yaxşı qoxusuz nəmləndirici istifadə etmək çox faydalıdır. Əks halda, qoxulu kremlər aralarında qarışıq nəticələr əldə edə bilər.\n\nDigər əyni məqamda bədən losyonu varsa, parfumun önünə istifadə etmək təsiri qat-qat gücləndirir. Bu üsul marqaya qulluq edər, həm də ətrini lay-lay möhkəmləndirər. Hətta saçlar belə - həm saçda qoşduruqlarınız parfum daha uzun qalır. Belə-cə, sadə bir verdiyiniz həm dəri əzizlik qalır, həm də sevdiyiniz qoxu unu biraz əzizlik olar.",
        },
      ],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  return (
    <div className="py-9">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground">
                Bloqlar
              </BreadcrumbLink>
            </BreadcrumbItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clip-path="url(#clip0_295_2185)">
                <path d="M11.3333 3.3335L4.66663 12.6668" stroke="#D3D3D7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_295_2185">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-medium">{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Article */}
        <article>
          <BlogPostHeader title={post.title} heroImage={post.heroImage} readingTime={post.readingTime} />
          <BlogPostContent content={post.content} publishDate={post.publishDate} />
        </article>

      </Container>
    </div>
  )
}
