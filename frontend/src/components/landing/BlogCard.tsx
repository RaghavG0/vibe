import Image from "next/image";
import { BlogMeta } from "./BlogMeta";
import { BlogCategoryBadge } from "./BlogCategoryBadge";
import { BlogReadMore } from "./BlogReadMore";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  image: string;
  readTime: string;
  category: string;
  date: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="blog-card group cursor-pointer h-full overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 z-10">
          <BlogCategoryBadge category={post.category} />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <BlogMeta readTime={post.readTime} date={post.date} />
        <h3 className="text-xl font-bold text-vibe-gray-800 mb-3 group-hover:text-vibe-purple-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-vibe-gray-600 mb-4 line-clamp-3">{post.summary}</p>
        <div className="mt-auto">
          <BlogReadMore />
        </div>
      </div>
    </div>
  );
}
