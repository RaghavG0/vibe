import { Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

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
    <div className="blog-card group cursor-pointer h-full">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="vibe-gradient text-white text-xs font-medium px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-vibe-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <span>•</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <h3 className="text-xl font-bold text-vibe-gray-800 mb-3 group-hover:text-vibe-purple-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-vibe-gray-600 mb-4 line-clamp-3">{post.summary}</p>
        <div className="flex items-center text-vibe-purple-600 font-medium group-hover:text-vibe-purple-700 transition-colors">
          <span className="text-sm">Read Article</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
