"use client";

import { useGlobal } from "@/components/context/GlobalContext";
import LoadingSkeleton from "@/components/layout/LoadingSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H2 } from "@/components/ui/typography";

export default function Notes() {
  const { userData, Crud } = useGlobal();
  return (
    <div className="max-w-5xl mx-auto">
      <H2>Notes</H2>
      <div className="flex flex-col gap-4 mt-4">
        {!userData.user && (
          <LoadingSkeleton className={"h-[68px]"} quantity={5} />
        )}
        {userData.user &&
          userData.user.notes.map((note) => (
            <Card>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                {note.description && (
                  <CardDescription>{note.description}</CardDescription>
                )}
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
}
