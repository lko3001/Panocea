"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CrudArguments,
  Data,
  FileProps,
  IncreaseOrDecrease,
  Pomodoro,
  PomodoroTimers,
} from "@/types";
import { Crud } from "../utils/apiFunctions";
import moment from "moment";

interface Props {
  openShortcut: () => void;
  setIsShortcutOpen: (isShortcutOpen: boolean) => void;
  isShortcutOpen: boolean;
  fileData: FileProps;
  UpdateFile: <T extends keyof Data>(props: CrudArguments<T>) => void;
  startPomodoro: () => void;
  stopPomodoro: () => void;
  changeTimers: (
    method: IncreaseOrDecrease,
    which: keyof PomodoroTimers
  ) => void;
  pomodoro: Pomodoro;
}

const GlobalContext = createContext({} as Props);

export function useGlobal() {
  return useContext(GlobalContext);
}

let timeoutWithRingtone: ReturnType<typeof setTimeout>;
let timeoutSimple: ReturnType<typeof setTimeout>;

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isShortcutOpen, setIsShortcutOpen] = useState(false);
  const [fileData, setFileData] = useState<FileProps>({} as FileProps);
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

  function openShortcut() {
    setIsShortcutOpen((p) => !p);
  }

  async function getFile() {
    const [fileHandle]: [FileSystemFileHandle] =
      // @ts-ignore
      await window.showOpenFilePicker({
        types: [
          {
            description: "JSON Files",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
      });
    const file: File = await fileHandle.getFile();
    const contents: Data = JSON.parse(await file.text());
    setFileData({ fileHandle, file, contents });
  }

  async function UpdateFile<T extends keyof Data>(props: CrudArguments<T>) {
    const response = await Crud<T>(props);
    setFileData((p) => ({ ...p, contents: JSON.parse(response.contents) }));
  }

  return (
    <GlobalContext.Provider
      value={{
        openShortcut,
        setIsShortcutOpen,
        isShortcutOpen,
        fileData,
        UpdateFile,
        stopPomodoro,
        startPomodoro,
        pomodoro,
        changeTimers,
      }}
    >
      <audio ref={ringtoneRef}>
        <source src="/audio/Rise.ogg"></source>
      </audio>
      {fileData.contents && children}
      {!fileData.contents && (
        <div className="min-h-screen grid place-items-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Choose your file</CardTitle>
              <CardDescription>
                You need a file to store your data
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button size={"lg"} onClick={getFile}>
                Upload File
              </Button>
              <Button size={"lg"} variant={"outline"}>
                Create File
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </GlobalContext.Provider>
  );
}
