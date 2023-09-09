import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function H1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h1 className={cn("shadcn-1", className)}>{children}</h1>;
}
function H2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={cn("shadcn-h2", className)}>{children}</h2>;
}
function H3({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h3 className={cn("shadcn-h3", className)}>{children}</h3>;
}
function H4({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h4 className={cn("shadcn-h4", className)}>{children}</h4>;
}

function Monospace({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("shadcn-monospace", className)}>{children}</span>;
}

export { H1, H2, H3, H4, Monospace };
