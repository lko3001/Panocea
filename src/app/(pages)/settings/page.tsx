"use client";
import { useGlobal } from "@/components/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/typography";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  const { clearUserData } = useGlobal();

  async function logOut() {
    await signOut({ callbackUrl: "/" });
    clearUserData();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <H2>Settings</H2>
      <div className="flex flex-col gap-4 mt-4">
        <pre className="rounded border bg-muted px-3 py-2 font-mono text-sm font-medium text-muted-foreground opacity-100">
          {JSON.stringify(session, undefined, 2)}
        </pre>
        <Button variant={"destructive"} onClick={logOut}>
          Log out
        </Button>
      </div>
    </div>
  );
}
