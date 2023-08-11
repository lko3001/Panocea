"use client";
import { useGlobal } from "@/components/context/GlobalContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1, H2 } from "@/components/ui/typography";
import { IncreaseOrDecrease, PomodoroTimers } from "@/types";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Pomodoro() {
  const { startPomodoro, stopPomodoro, pomodoro, changeTimers } = useGlobal();

  return (
    <div className="max-w-5xl mx-auto h-full">
      <H2 className="mb-6">Pomodoro</H2>

      <div className="grid place-items-center">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-center">Timer</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center mb-1">
              Pomodoro
            </CardDescription>
            <TimerWithButton
              timers={pomodoro.timers}
              what={"pomodoro"}
              changeTimers={changeTimers}
            />
          </CardContent>
          <CardContent>
            <CardDescription className="text-center mb-1">
              Break
            </CardDescription>
            <TimerWithButton
              timers={pomodoro.timers}
              what={"break"}
              changeTimers={changeTimers}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="mx-auto"
              variant={pomodoro.isRunning ? "destructive" : "default"}
              onClick={() =>
                !pomodoro.isRunning ? startPomodoro() : stopPomodoro()
              }
            >
              {pomodoro.isRunning ? "Stop" : "Start"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function TimerWithButton({
  timers,
  what,
  changeTimers,
}: {
  timers: PomodoroTimers;
  what: keyof PomodoroTimers;
  changeTimers: (
    method: IncreaseOrDecrease,
    which: keyof PomodoroTimers
  ) => void;
}) {
  return (
    <div className="flex flex-row items-center gap-3">
      <Button
        onClick={() => changeTimers("decrease", what)}
        size={"icon"}
        variant={"outline"}
        disabled={timers[what] <= 0}
        className="aspect-square"
      >
        <MinusIcon />
      </Button>
      <H1>
        {new Intl.DateTimeFormat("it-IT", {
          minute: "numeric",
          second: "numeric",
          hour12: false,
        }).format(new Date(1970, 0, 1).setSeconds(60 * timers[what]))}
      </H1>

      <Button
        onClick={() => changeTimers("increase", what)}
        size={"icon"}
        variant={"outline"}
        disabled={timers[what] >= 55}
        className="aspect-square"
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
