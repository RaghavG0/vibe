import { Clock } from "lucide-react";

interface BlogMetaProps {
  readTime: string;
  date: string;
}

export function BlogMeta({ readTime, date }: BlogMetaProps) {
  return (
    <div className="flex items-center space-x-4 text-sm text-vibe-gray-500 mb-3">
      <div className="flex items-center space-x-1">
        <Clock className="w-4 h-4" />
        <span>{readTime}</span>
      </div>
      <span>•</span>
      <span>
        {new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  );
}