"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IncreaseOrDecrease, Pomodoro, PomodoroTimers } from "@/types";
import moment from "moment";

interface Props {
  startPomodoro: () => void;
  stopPomodoro: () => void;
  changeTimers: (
    method: IncreaseOrDecrease,
    which: keyof PomodoroTimers
  ) => void;
  pomodoro: Pomodoro;
}

const PomodoroContext = createContext({} as Props);

export function usePomodoro() {
  return useContext(PomodoroContext);
}

let timeoutWithRingtone: ReturnType<typeof setTimeout>;
let timeoutSimple: ReturnType<typeof setTimeout>;

export function PomodoroContextProvider({ children }: { children: ReactNode }) {
  const [pomodoro, setPomodoro] = useState<Pomodoro>({
    isRunning: false,
    stage: "pomodoro",
    timers: {
      pomodoro: 25,
      break: 5,
    },
    finishTime: undefined,
  });

  function changeTimers(
    method: IncreaseOrDecrease,
    which: keyof PomodoroTimers
  ) {
    const delta = 5;
    setPomodoro((p) => ({
      ...p,
      timers: {
        ...p.timers,
        [which]:
          method === "increase"
            ? p.timers[which] + delta
            : p.timers[which] - delta,
      },
    }));
  }

  useEffect(() => {
    if (!pomodoro.isRunning) return;
    const ringToneDuration = ringtoneRef.current?.duration
      ? ringtoneRef?.current?.duration
      : 0;
    setFinishTime(pomodoro.stage);
    timeoutWithRingtone = setTimeout(() => {
      // RINGTONE END
      setPomodoro((p) => ({
        ...p,
        stage: pomodoro.stage === "break" ? "pomodoro" : "break",
      }));
    }, pomodoro.timers[pomodoro.stage] * 60000 + ringToneDuration * 1000);

    timeoutSimple = setTimeout(
      () => {
        // RINGTONE START
        ringtoneRef.current!.currentTime = 0;
        ringtoneRef.current?.play();
        setFinishTime(undefined);
      },
      // 60000 is the factor that converts N to minutes
      pomodoro.timers[pomodoro.stage] * 60000
    );
  }, [pomodoro.isRunning, pomodoro.stage]);

  const ringtoneRef = useRef<HTMLAudioElement | null>(null);

  function setFinishTime(which: keyof PomodoroTimers | undefined) {
    if (!which) {
      setPomodoro((p) => ({ ...p, finishTime: undefined }));
      return;
    }
    setPomodoro((p) => ({
      ...p,
      finishTime: p.timers[which]
        ? moment().add(p.timers[which], "minutes").format()
        : undefined,
    }));
  }

  function startPomodoro() {
    setPomodoro((p) => ({ ...p, isRunning: true }));
  }

  function stopPomodoro() {
    setPomodoro((p) => ({
      ...p,
      isRunning: false,
      finishTime: undefined,
      stage: "pomodoro",
    }));
    ringtoneRef.current?.pause();
    clearTimeout(timeoutWithRingtone);
    clearTimeout(timeoutSimple);
  }

  return (
    <PomodoroContext.Provider
      value={{
        stopPomodoro,
        startPomodoro,
        pomodoro,
        changeTimers,
      }}
    >
      <audio ref={ringtoneRef}>
        <source src="/audio/Rise.ogg"></source>
      </audio>
      {children}
    </PomodoroContext.Provider>
  );
}
