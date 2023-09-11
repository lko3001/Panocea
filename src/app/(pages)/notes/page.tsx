"use client";

import { useGlobal } from "@/components/context/GlobalContext";
import LoadingSkeleton from "@/components/layout/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H2 } from "@/components/ui/typography";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { compareDate } from "@/lib/utils";
import DeleteButton from "@/components/layout/DeleteButton";

const formSchema = z.object({
  title: z.string().nonempty(),
});

export default function Notes() {
  const { userData } = useGlobal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/text-editor?title=${values.title}`);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <H2>Notes</H2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row gap-2 my-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input autoFocus placeholder="Title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
      <div className="flex flex-col gap-4">
        {!userData.user && (
          <LoadingSkeleton className={"h-[68px]"} quantity={5} />
        )}
        {userData.user &&
          userData.user.notes.sort(compareDate).map((note) => (
            <>
              <Card>
                <CardContent className="pb-0 pr-4 pl-0 flex flex-row items-center gap-4">
                  <Link
                    className="grow h-[68px] pl-6 flex items-center "
                    href={{
                      pathname: "/text-editor",
                      query: { id: note.id },
                    }}
                  >
                    {note.title}
                  </Link>
                  <DeleteButton
                    name="note"
                    where="note"
                    idsToDelete={[note.id!]}
                    withDialog
                  />
                </CardContent>
              </Card>
            </>
          ))}
      </div>
    </div>
  );
}
