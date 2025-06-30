import { cn } from "../../../lib/utils";

// Skeleton component: use as a placeholder while loading content
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };

/*
Advice:
- Use <Skeleton /> for loading states in cards, lists, or avatars.
- Extend with width/height classes for different shapes.
- For accessibility, consider adding aria-busy or role="status" if used as a loading indicator.
*/