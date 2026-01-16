import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeListProps {
  items: string[];
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function BadgeList({
  items,
  variant = "secondary",
  className,
}: BadgeListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <Badge key={item} variant={variant}>
          {item}
        </Badge>
      ))}
    </div>
  );
}
