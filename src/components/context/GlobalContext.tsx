"use client";

import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CrudArguments, Data, FileProps } from "@/types";
import { Crud } from "../utils/apiFunctions";
import { Input } from "../ui/input";

interface Props {
  openShortcut: () => void;
  setIsShortcutOpen: (isShortcutOpen: boolean) => void;
  isShortcutOpen: boolean;
  fileData: FileProps;
  UpdateFile: <T extends keyof Data>(props: CrudArguments<T>) => void;
}

const GlobalContext = createContext({} as Props);

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isShortcutOpen, setIsShortcutOpen] = useState(false);
  const [fileData, setFileData] = useState<FileProps>({} as FileProps);
  const idk = useRef(null);

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

  async function UpdateFile<T extends keyof Data>(props: CrudArguments<T>) {
    const response = await Crud<T>(props);
    setFileData((p) => ({ ...p, contents: response.contents }));
  }

  return (
    <GlobalContext.Provider
      value={{
        openShortcut,
        setIsShortcutOpen,
        isShortcutOpen,
        fileData,
        UpdateFile,
      }}
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
