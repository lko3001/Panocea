"use client";

import { Crud } from "@/components/utils/apiFunctions";
import data from "@/data.json";
import { Todo } from "@/types";
import { v4 } from "uuid";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function Todo() {
  const inputRef = useRef<HTMLInputElement>(null);
  function compare(a: Todo, b: Todo) {
    if (a.pinned === b.pinned) {
      return 0;
    } else if (a.pinned === true) {
      return -1;
    } else {
      return 1;
    }
  }

  function createTodo() {
    if (inputRef.current && inputRef.current.value) {
      const what = {
        id: v4(),
        pinned: false,
        text: inputRef.current.value,
      };
      Crud({ what, where: "todos", method: "create" });
      inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-6">
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
      {data.todos.sort(compare).map((todo: Todo) => (
        <Card key={todo.id}>
          <CardContent className="py-4 pr-4 flex flex-row items-center gap-6">
            <p className="grow">{todo.text}</p>
            <Button
              variant={"destructive"}
              className="p-2 aspect-square"
              onClick={() =>
                Crud({
                  method: "delete",
                  where: "todos",
                  fieldName: "id",
                  id: todo.id,
                })
              }
            >
              <Cross2Icon />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
