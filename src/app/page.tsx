"use client";
import { useGlobal } from "@/components/context/GlobalContext";
import Shortcut from "@/components/layout/Shortcut";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import data from "@/data.json";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { openShortcut, fileData } = useGlobal();

  async function writeFile(fileHandle: FileSystemFileHandle, contents: string) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();

    console.log("DONE");
  }

  return (
    <div>
      <Button onClick={() => writeFile(fileData.fileHandle, "LUL TEST")}>
        WRITE FILE
      </Button>
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
