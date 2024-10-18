"use client";

import { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ButtonTheme } from "../button.theme";
import { NavSheet } from "./sheet.nav";
import { LinkPage } from "./link.page";
import ButtonLogout from "../button.signout";

const AvatarProfile = ({ image }: { image: string }) => (
  <Avatar className="flex items-center">
    <AvatarImage src={image} />
  </Avatar>
);

export default function Nav({ sessionUser }: { sessionUser: User }) {
  const { name, image } = sessionUser;
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full p-4 border-b">
      <div className="container flex items-center justify-between max-w-5xl mx-auto ">
        <div className="flex max-sm:flex-col items-center space-x-2">
          <Link
            href="/"
            className=" hover:underline underline-offset-4 font-semibold text-xl"
          >
            <span className="text-primary">NextCrudStarter</span>
          </Link>
          <p className="text-sm font-thin space-x-2 flex items-center max-md:hidden">
            {image && <AvatarProfile image={image} />}
            <span className="text-foreground">{name}</span>
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
