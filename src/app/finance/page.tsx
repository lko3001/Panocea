"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Data } from "@/types";
import { useGlobal } from "@/components/context/GlobalContext";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const FormSchema = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
});

export default function Debt() {
  const [tabValue, setTabValue] = useState<"loss" | "entry">("entry");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      price: "0",
      description: "",
      category: undefined,
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create new finance</Button>
        </DialogTrigger>
        <DialogContent
          className={`outline ${
            tabValue === "loss"
              ? "dark:outline-red-600 outline-red-400"
              : "dark:outline-green-600 outline-green-400"
          }`}
        >
          <Tabs defaultValue="entry">
            <TabsList className="grid w-full grid-cols-2 my-4 mt-6">
              <TabsTrigger
                value="entry"
                onClick={(e: any) => setTabValue(e.target.innerHTML)}
                className="capitalize data-[state=active]:dark:bg-green-600 data-[state=active]:bg-green-400"
              >
                entry
              </TabsTrigger>
              <TabsTrigger
                value="loss"
                onClick={(e: any) => setTabValue(e.target.innerHTML)}
                className="capitalize data-[state=active]:dark:bg-red-600 data-[state=active]:bg-red-400"
              >
                loss
              </TabsTrigger>
            </TabsList>
            <TabsContent value="entry">
              <FinanceForm
                handleSubmit={form.handleSubmit(handleSubmit)}
                form={form}
              />
            </TabsContent>
            <TabsContent value="loss">
              <FinanceForm
                handleSubmit={form.handleSubmit(handleSubmit)}
                form={form}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

function FinanceForm({ form, handleSubmit }: { form: any; handleSubmit: any }) {
  const { fileData } = useGlobal();
  const data: Data = JSON.parse(fileData.contents);

  const categories = Array.from(new Set(data.finance.map((el) => el.category)));

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">title</FormLabel>
              <FormControl>
                <Input placeholder="Grocery shopping..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="963"
                  {...field}
                  min={0}
                  step={0.01}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="I spent so much because..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category === field.value
                          )
                        : "Select category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category}
                          key={category}
                          onSelect={() => {
                            form.setValue("category", category);
                          }}
                        >
                          {category}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              category === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
