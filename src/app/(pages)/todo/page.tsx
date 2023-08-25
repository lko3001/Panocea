"use client";

import { Todo } from "@/types";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useGlobal } from "@/components/context/GlobalContext";
import { H2 } from "@/components/ui/typography";

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
      {userData.user &&
        userData.user.todos &&
        userData.user.todos.sort(comparePinned).map((todo) => {
          return (
            <Card key={todo.id}>
              <CardContent className="py-4 pr-4 flex flex-row items-center gap-6">
                <p className="grow">{todo.text}</p>
                <Button
                  variant={"destructive"}
                  className="p-2 aspect-square"
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
