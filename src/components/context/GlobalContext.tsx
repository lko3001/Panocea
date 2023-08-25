"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CrudBody, PrismaCleared, UserData } from "@/types";
import { useSession } from "next-auth/react";

interface Props {
  openShortcut: () => void;
  setIsShortcutOpen: (isShortcutOpen: boolean) => void;
  isShortcutOpen: boolean;
  userData: UserData;
  clearUserData: () => void;
  Crud: <T extends PrismaCleared>(props: CrudBody<T>) => any;
}

const GlobalContext = createContext({} as Props);

export function useGlobal() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isShortcutOpen, setIsShortcutOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const session = useSession();

  useEffect(() => {
    if (session.status !== "authenticated") return;
    fetch("/api/get-current-user-data", {
      method: "POST",
      body: JSON.stringify(session.data),
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.log("ERROR", err));
  }, [session]);

  function openShortcut() {
    setIsShortcutOpen((p) => !p);
  }

  function clearUserData() {
    setUserData({} as UserData);
  }

  async function Crud<T extends PrismaCleared>(props: CrudBody<T>) {
    const res = await fetch("/api/crud", {
      method: "POST",
      body: JSON.stringify(props),
    });
    const data = await res.json();
    return data;
  }

  return (
    <GlobalContext.Provider
      value={{
        openShortcut,
        setIsShortcutOpen,
        isShortcutOpen,
        userData,
        clearUserData,
        Crud,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
