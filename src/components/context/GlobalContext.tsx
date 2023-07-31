"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  openShortcut: () => void;
  setIsShortcutOpen: (isShortcutOpen: boolean) => void;
  isShortcutOpen: boolean;
  fileData: FileProps;
}

interface FileProps {
  contents: string;
  file: File;
  fileHandle: FileSystemFileHandle;
}

const GlobalContext = createContext({} as Props);

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isShortcutOpen, setIsShortcutOpen] = useState(false);
  const [fileData, setFileData] = useState<FileProps>({} as FileProps);

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
    const contents: string = await file.text();
    setFileData({ fileHandle, file, contents });
  }

  return (
    <GlobalContext.Provider
      value={{ openShortcut, setIsShortcutOpen, isShortcutOpen, fileData }}
    >
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
