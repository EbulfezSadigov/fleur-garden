import { BlogCard } from "@/components/pages/blogs/blog-card"
import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const blogPosts = [
    {
        id: 1,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 2,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 3,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 4,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 5,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 6,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 7,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 8,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
    {
        id: 9,
        date: "19.08.2025",
        title: "Yeni Koleksiya",
        description: "Taze, enerjili və zərif notlarla hazırlanmış yeni kolleksiyamız artıq satışda.",
        image: "/images/blog.jpg",
    },
]

export default function BlogGrid() {
    return (
        <section className="w-full py-9">
            <Container>
                <div className="mb-12">
                    <h1 className="text-[32px] font-semibold text-foreground mb-8">Bloqlar</h1>
                    <div className="relative w-1/3">
                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-4 pr-12 h-12 py-4 border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <Button
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 p-0 hover:bg-gray-800"
                        >
                            <Search className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                    <div className="flex justify-center pt-4">
                        <Button variant="outline" className="px-8 bg-transparent border-black">
                            Daha çox
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
