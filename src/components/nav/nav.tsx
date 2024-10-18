"use client";

import { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AvatarImage } from "../ui/avatar";
import { ButtonTheme } from "../button.theme";
import { NavSheet } from "./sheet.nav";
import { LinkPage } from "./link.page";
import ButtonLogout from "../button.signout";

export default function Nav({ sessionUser }: { sessionUser: User }) {
  const { name, image } = sessionUser;
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full p-4 border-b">
      <div className="container flex items-center justify-between max-w-5xl mx-auto ">
        <div className="flex max-sm:flex-col items-center sm:space-x-4">
          <Link
            href="/"
            className=" hover:underline underline-offset-4 font-semibold text-xl"
          >
            <span className="text-primary">NextCrudStarter</span>
          </Link>
          <p className="text-sm font-thin text-foreground/75 max-md:hidden">
            Welcome back {image && <AvatarImage src={image} />} {name}
          </p>
        </div>

        {/* Burger Menu */}
        <NavSheet pathname={pathname} sessionUser={sessionUser} />

        {/* Nav links */}
        <div className="flex items-center space-x-4 max-md:hidden">
          <LinkPage
            pathname={pathname}
            href="/publications"
            label="Publications"
          />
          <LinkPage pathname={pathname} href="/profile" label="Profile" />
          <ButtonTheme />
          <ButtonLogout withLogo />
        </div>
      </div>
    </nav>
  );
}
