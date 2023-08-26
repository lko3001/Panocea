import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton({
  quantity,
  className,
}: {
  quantity: number;
  className: string;
}) {
  return new Array(quantity)
    .fill(Math.random())
    .map(() => <Skeleton key={Math.random()} className={className} />);
}
