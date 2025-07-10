interface BlogCategoryBadgeProps {
  category: string;
}

export function BlogCategoryBadge({ category }: BlogCategoryBadgeProps) {
  return (
    <span className="vibe-gradient text-white text-xs font-medium px-3 py-1 rounded-full">
      {category}
    </span>
  );
}