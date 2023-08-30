"use client";

import routesJson from "@/json/routes.json";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useGlobal } from "../context/GlobalContext";

export default function Shortcut() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { isShortcutOpen, setIsShortcutOpen, openShortcut } = useGlobal();

  const routeCategories: string[] = Array.from(
    new Set(routesJson.routes.map((route) => route.category))
  ).filter((el) => Boolean(el));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        openShortcut();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog open={isShortcutOpen} onOpenChange={setIsShortcutOpen}>
        <CommandInput
          ref={inputRef}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {routeCategories.map((category) => (
            <CommandGroup
              key={category}
              className="capitalize"
              heading={category}
            >
              {routesJson.routes
                .filter((route) => route.category === category)
                .map((route) => (
                  <CommandItem
                    key={route.slug}
                    onSelect={() => {
                      router.push(route.slug);
                      openShortcut();
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>{route.name}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
