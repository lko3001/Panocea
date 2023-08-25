"use client";
import data from "@/data.json";
import { useGlobal } from "@/components/context/GlobalContext";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { openShortcut, userData } = useGlobal();

  return (
    <div className="mx-auto max-w-3xl">
      <Input
        className="mb-6"
        placeholder="Search or Press CTRL + K..."
        onClick={openShortcut}
      />
      {data.routes.map((route) => (
        <Link href={route.slug} key={route.slug}>
          <Card
            key={route.slug}
            className="mb-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 dark:focus-visible:bg-neutral-900 focus-visible:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="capitalize">{route.name}</CardTitle>
              <CardDescription className="!mt-0">{route.slug}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
