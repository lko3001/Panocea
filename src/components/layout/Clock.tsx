"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useEffect, useState } from "react";
import { usePomodoro } from "@/components/context/PomodoroContext";
export default function Clock() {
  const router = useRouter();
  const { pomodoro } = usePomodoro();
  const [now, setNow] = useState(moment().format());

  useEffect(() => {
    setInterval(() => {
      setNow(moment().format());
    }, 100);
  }, []);

  return (
    <Button
      variant={"ghost"}
      className="text-xl font-semibold"
      onClick={() => router.push("/")}
    >
      {moment(now).format("HH:mm")}
      {pomodoro.isRunning && pomodoro.finishTime && (
        <>
          {" "}
          •{" "}
          {moment(moment(pomodoro.finishTime).diff(moment(now))).format(
            "mm:ss"
          )}
        </>
      )}
    </Button>
  );
}
