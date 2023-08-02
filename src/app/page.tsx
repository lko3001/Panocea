"use client";
import { useGlobal } from "@/components/context/GlobalContext";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Data } from "@/types";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { openShortcut, fileData } = useGlobal();
  const data: Data = JSON.parse(fileData.contents);

  return (
    <div>
      <Input
        className="mb-6"
        placeholder="Search or Press CTRL + K..."
        onClick={openShortcut}
      />
      {data.routes.map((route) => (
        <Card
          key={route.slug}
          className="mb-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 dark:focus-visible:bg-neutral-900 focus-visible:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          tabIndex={0}
          onClick={() => router.push(route.slug)}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="capitalize">{route.name}</CardTitle>
            <CardDescription className="!mt-0">{route.slug}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
