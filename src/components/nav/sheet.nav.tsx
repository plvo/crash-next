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
import ButtonLogout from "../button.signout";
import { ButtonTheme } from "../button.theme";

export function NavSheet({
  pathname,
  sessionUser,
}: {
  pathname: string;
  sessionUser: User;
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
            <LinkSheet pathname={pathname} href="/" label="Home" />
            <LinkSheet
              pathname={pathname}
              href="/publications"
              label="Publications"
            />
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
