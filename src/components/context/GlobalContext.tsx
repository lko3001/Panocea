"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CrudBody,
  Pluralize,
  PrismaBody,
  PrismaCleared,
  UserData,
} from "@/types";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

interface Props {
  openShortcut: () => void;
  setIsShortcutOpen: (isShortcutOpen: boolean) => void;
  isShortcutOpen: boolean;
  userData: UserData;
  clearUserData: () => void;
  Crud: <T extends PrismaCleared>(
    props: PrismaBody<T>,
    updateLocally?: boolean
  ) => any;
}

const GlobalContext = createContext({} as Props);
export function useGlobal() {
  return useContext(GlobalContext);
}
export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isShortcutOpen, setIsShortcutOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    console.log("SESSION", session);
    if (session.status !== "authenticated") return;
    fetch("/api/get-current-user-data", {
      method: "POST",
      body: JSON.stringify(session.data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData({
          ...data,
          user: { ...data.user, rssFeeds: data.user.rssfeeds },
        });
      })
      .catch((err) => console.log("ERROR", err));
  }, [session]);

  function openShortcut() {
    setIsShortcutOpen((p) => !p);
  }

  function clearUserData() {
    setUserData({} as UserData);
  }

  async function Crud<T extends PrismaCleared>(
    props: PrismaBody<T>,
    updateLocally?: boolean
  ) {
    const temporaryId = `temporary-${v4()}`;
    const localWhere = (props.where + "s") as Pluralize<PrismaCleared>;

    if (updateLocally) {
      switch (props.method) {
        case "update":
          setUserData((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              [localWhere]: [
                ...prev.user[localWhere].map((el) =>
                  el.id === props.what.id ? props.what : el
                ),
              ],
            },
          }));
          break;
        case "create":
          setUserData((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              [localWhere]: [
                ...prev.user[localWhere],
                { ...props.what, id: temporaryId },
              ],
            },
          }));
          break;
        case "deleteMany":
          if (props.what.find((id) => id.startsWith("temporary"))) {
            console.log(
              `An error occured because you tried to delete an element that you just created before it got created in the database. Wait and try again`
            );
          }
          setUserData((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              [localWhere]: [
                ...prev.user[localWhere].filter(
                  (el) => !props.what.includes(el.id!)
                ),
              ],
            },
          }));
          break;
      }
    }

    try {
      const res = await fetch("/api/crud", {
        method: "POST",
        body: JSON.stringify(props),
      });
      const data = await res.json();
      // This swaps the new created element with the actual element created to the DB
      if (updateLocally) {
        setUserData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            [localWhere]: [
              ...prev.user[localWhere].map((el) =>
                el.id === temporaryId ? data : el
              ),
            ],
          },
        }));
      }
      return data;
    } catch (err) {
      console.log(err);
      if (updateLocally) {
        setUserData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            [localWhere]: [
              ...prev.user[localWhere].filter((el) => el.id !== temporaryId),
            ].reverse(),
          },
        }));
      }
      toast({
        title: "Try again",
        description: "The database didn't create the todo",
        variant: "destructive",
      });
      return err;
    }
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
      <Toaster />
    </GlobalContext.Provider>
  );
}
