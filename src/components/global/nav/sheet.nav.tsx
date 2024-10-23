import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { LinkSheet } from "./link.page";
import { User } from "next-auth";
import ButtonLogout from "@/components/global/button.signout";
import ButtonTheme from "@/components/global/button.theme";

export function NavSheet({
  pathname,
  sessionUser,
  PAGES_LIST,
}: {
  pathname: string;
  sessionUser: User;
  PAGES_LIST: PageLink[];
}) {
  const { name } = sessionUser;

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" size={"icon"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:hidden flex flex-col justify-between py-16">
        <SheetHeader className="space-y-8">
          <div className="text-center">
            <SheetTitle>NextCrudStarter</SheetTitle>
            <SheetDescription>Welcome back {name}</SheetDescription>
          </div>
          <div className="w-full flex flex-col gap-4">
            {
              PAGES_LIST.map((page, index) => (
                <LinkSheet
                  key={index}
                  pathname={pathname}
                  href={page.href}
                  label={page.label}
                />
              ))
            }
          </div>
        </SheetHeader>

        <div className="w-full flex flex-col gap-4">
          <ButtonTheme withText />
          <ButtonLogout />
        </div>
      </SheetContent>
    </Sheet>
  );
}
