import Link from "next/link";
import { Button } from "../ui/button";

export function LinkPage({
  pathname,
  label,
  href,
}: {
  pathname: string;
  label: string;
  href: string;
}) {
  const isCurrentPage = pathname.startsWith(href);
  const textColor = isCurrentPage
    ? "text-primary underline"
    : "text-foreground/50";
  return (
    <Link
      href={href}
      className={textColor + " hover:underline underline-offset-4"}
    >
      {label}
    </Link>
  );
}

export function LinkSheet({
  pathname,
  label,
  href,
}: {
  pathname: string;
  label: string;
  href: string;
}) {
  const isCurrentPage =
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className="w-full">
      <Button
        variant={isCurrentPage ? "default" : "outline"}
        className="w-full"
      >
        {label} 
      </Button>
    </Link>
  );
}
