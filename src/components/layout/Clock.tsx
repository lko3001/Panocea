"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import { usePomodoro } from "@/components/context/PomodoroContext";
import Link from "next/link";
export default function Clock() {
  const { pomodoro } = usePomodoro();
  const [now, setNow] = useState(moment().format());

  useEffect(() => {
    setInterval(() => {
      setNow(moment().format());
    }, 100);
  }, []);

  return (
    <Link
      href={"/"}
      className="text-xl font-semibold hover:bg-muted inline-block px-3 py-1 rounded-md"
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
    </Link>
  );
}
