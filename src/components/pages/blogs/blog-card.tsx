import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  id: number
  date: string
  title: string
  description: string
  image: string
}

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.id}`} className="overflow-hidden border-0 shadow-none bg-transparent p-4 pb-6"
      style={{
        borderRadius: "12px",
        border: "1px solid #F2F4F8",
        background: "#FFF",
        boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
      }}
    >
      <div className="aspect-[4/3] relative mb-4">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover rounded-lg" />
      </div>
      <div className="p-0 space-y-2">
        <p className="text-xs text-muted-foreground">{post.date}</p>
        <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
      </div>
    </Link>
  )
}
