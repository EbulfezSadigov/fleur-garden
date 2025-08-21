import Container from "@/components/shared/container"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
    id: number
    date: string
    title: string
    description: string
    image: string
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Təzə, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 2,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Təzə, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 3,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Təzə, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
]

export function BlogSection() {
    return (
        <section className="w-full py-[72px]">
            {/* Header */}
            <Container>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[36px] font-medium text-primary">Bloqlar</h2>
                    <Link
                        href="#"
                        className="flex items-center gap-2 font-medium text-primary hover:text-foreground transition-colors group"
                    >
                        <span>Daha çox</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="overflow-hidden border border-[#F2F4F8] p-4 rounded-[12px] shadow-none bg-transparent">
                            <div className="space-y-4">
                                {/* Image */}
                                <div className="aspect-[4/3] overflow-hidden rounded-[12px]">
                                    <Image
                                        width={400}
                                        height={300}
                                        src={post.image || "/placeholder.svg"}
                                        alt={post.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <p className="text-xs text-[#77777B] font-medium">{post.date}</p>
                                    <h3 className="text-lg font-medium text-primary">{post.title}</h3>
                                    <p className="text-sm text-[#77777B] leading-relaxed">{post.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
