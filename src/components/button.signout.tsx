"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function ButtonLogout({ withLogo }: { withLogo?: boolean }) {
  return (
    <Button
      variant="outline"
      className="text-destructive"
      size={withLogo ? "icon" : "default"}
      onClick={() => signOut()}
    >
      {withLogo ? <LogOut /> : "Sign out"}
    </Button>
  );
}
