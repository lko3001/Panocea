"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Clock() {
  const [time, setTime] = useState<number>(Date.now());
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      const now = Date.now();
      setTime(now);
    }, 1000);
  }, []);

  return (
    <Button
      variant={"ghost"}
      className="text-xl font-semibold"
      onClick={() => router.push("/")}
    >
      {new Intl.DateTimeFormat("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(time)}
    </Button>
  );
}
