"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import ModeToggle from "./ModeToggle";
import { signIn, useSession } from "next-auth/react";

export default function ProfileButton() {
  const router = useRouter();
  const session = useSession();

  if (session.status === "unauthenticated")
    return <Button onClick={() => signIn("github")}>Login</Button>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <PersonIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-translate-x-8 text-right">
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          Settings
        </DropdownMenuItem>
        <ModeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
