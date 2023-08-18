"use client";
import { Button } from "@/components/ui/button";

export default function Test() {
  async function createEverything() {
    const res = await fetch("/api/test", { method: "POST" });
    const data = await res.json();
    console.log(data);
  }
  return <Button onClick={createEverything}>Create everything</Button>;
}
