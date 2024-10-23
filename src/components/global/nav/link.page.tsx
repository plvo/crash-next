import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LinkPage({
  pathname,
  pageLink,
}: {
  pathname: string;
  pageLink: PageLink;
}) {
  const { href, label } = pageLink;
  const isCurrentPage = pageLink.startWith
    ? pathname.startsWith(href)
    : href === pathname;
  
    const textColor = isCurrentPage
    ? "text-primary underline"
    : "text-foreground/50";

  return (
    <Link
      href={href}
      className={textColor + " link-string flex items-center gap-1.5"}
    >
      {pageLink.icon && pageLink.icon}
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
  label: string | JSX.Element;
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
        <>{label}</>
      </Button>
    </Link>
  );
}
