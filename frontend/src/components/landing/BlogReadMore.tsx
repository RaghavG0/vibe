import { ArrowRight } from "lucide-react";

export function BlogReadMore() {
  return (
    <div className="flex items-center text-vibe-purple-600 font-medium group-hover:text-vibe-purple-700 transition-colors">
      <span className="text-sm">Read Article</span>
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform cursor-pointer" />
    </div>
  );
}