"use client";

import { Todo } from "@/types";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useGlobal } from "@/components/context/GlobalContext";
import { H2 } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/layout/LoadingSkeleton";
import { v4 } from "uuid";

export default function Todo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { userData, Crud } = useGlobal();

  function comparePinned(a: Todo, b: Todo) {
    if (a.pinned === b.pinned) {
      return 0;
    } else if (a.pinned === true) {
      return -1;
    } else {
      return 1;
    }
  }

  async function createTodo() {
    if (inputRef.current && inputRef.current.value) {
      Crud({
        method: "create",
        what: {
          pinned: false,
          text: inputRef.current.value,
          userId: userData.user.id,
        },
        where: "todo",
      });

      inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <H2>To Do List</H2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodo();
        }}
        className="flex flex-row gap-2"
      >
        <Input
          type="text"
          placeholder="What do I have to do?"
          autoFocus
          ref={inputRef}
        />
        <Button>Create</Button>
      </form>
      {!userData.user && (
        <LoadingSkeleton className={"h-[68px]"} quantity={5} />
      )}
      {userData.user &&
        userData.user.todos
          .reverse()
          .sort(comparePinned)
          .map((todo) => {
            const isTemporary = todo.id!.startsWith("temporary");
            return (
              <Card
                key={todo.id}
                className={`${isTemporary ? "animate-pulse" : ""}`}
              >
                <CardContent className="py-4 pr-4 flex flex-row items-center gap-4">
                  <p className="grow">{todo.text}</p>
                  <Button
                    variant={"ghost"}
                    className="p-2 aspect-square"
                    disabled={isTemporary}
                    onClick={() => {
                      Crud({
                        method: "deleteMany",
                        where: "todo",
                        what: [todo.id!],
                      });
                    }}
                  >
                    <Cross2Icon />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
    </div>
  );
}
