"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useGlobal } from "../context/GlobalContext";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PrismaCleared } from "@/types";

export default function CloseButton<T extends PrismaCleared>({
  name,
  idsToDelete,
  where,
  withDialog = false,
}: {
  name: string;
  idsToDelete: string[];
  where: T;
  withDialog?: boolean;
}) {
  const { Crud } = useGlobal();

  function deleteItems() {
    Crud({
      method: "deleteMany",
      where: where,
      what: idsToDelete,
    });
  }

  if (!withDialog)
    return (
      <Button
        onClick={deleteItems}
        variant={"ghost"}
        className="p-2 aspect-square"
      >
        <Cross2Icon />
      </Button>
    );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="p-2 aspect-square z-50">
          <Cross2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {name}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteItems}>
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
