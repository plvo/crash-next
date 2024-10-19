"use client";

import { user } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import HoverItem from "@/components/hover.item";

export default function HeaderProfile({ data }: { data: user }) {
  const { name, profile_img, role, email, phone } = data;

  return (
    <header className="flex max-md:flex-col max-lg:justify-center items-center gap-4">
      <Avatar>
        <AvatarImage
          src={profile_img}
          className="size-64 rounded-full object-cover"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="flex items-center gap-2 text-4xl font-bold">
          {name}{" "}
          {role === "VIP" && (
            <HoverItem
              trigger={<StarFilledIcon className="text-yellow-500 size-8" />}
              content={
                <p className="text-sm">
                  This user is a <span className="text-yellow-500">VIP</span>
                </p>
              }
            />
          )}
        </h2>
        <Link
          href={"mailto:" + email}
          className="link-string text-start text-foreground/50"
        >
          {email}
        </Link>
        <p className="text-start text-foreground/40">{phone}</p>
      </div>
    </header>
  );
}
