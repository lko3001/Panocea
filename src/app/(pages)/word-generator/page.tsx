"use client";
import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/typography";
import words from "@/json/words.json";
import { randomChoice, shuffleArray, splitByVowels } from "@/lib/utils";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

type WordsType = keyof typeof words;
// const wordsType = Object.keys(words) as WordsType[];

const usernameFormSchema = z.object({
  wordsType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
const randomWordFormSchema = z.object({
  wordLength: z.coerce.number().min(3).max(20),
});

export default function WordGenerator() {
  const [generatedFakeWord, setGeneratedWord] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");

  const usernameForm = useForm<z.infer<typeof usernameFormSchema>>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      wordsType: ["adjectives", "nouns"],
    },
  });
  const randomWordForm = useForm<z.infer<typeof randomWordFormSchema>>({
    resolver: zodResolver(randomWordFormSchema),
    defaultValues: {
      wordLength: 8,
    },
  });

  function randomUsernameSubmit(values: z.infer<typeof usernameFormSchema>) {
    generateRandomUsername(values.wordsType as WordsType[]);
  }
  function randomWordSubmit(values: z.infer<typeof randomWordFormSchema>) {
    generateRandomWord(values.wordLength);
  }

  function generateRandomUsername(which: WordsType[]) {
    const chosenWords = which.map((property) => randomChoice(words[property]));
    setGeneratedUsername(chosenWords.join("-").toLocaleLowerCase());
  }
  function generateRandomWord(number: number) {
    const chosenWords = new Array(number)
      .fill(0)
      .map(() => randomChoice(words["nouns"]));
    const syllables = splitByVowels(chosenWords.join(""));
    const shuffledSyllables = shuffleArray(syllables);

    const randomWordArray: string[] = [];
    let index = 0;

    while (randomWordArray.join("").length <= number) {
      randomWordArray.push(shuffledSyllables[index]);
      index++;
    }

    setGeneratedWord(randomWordArray.join("").slice(0, number));
  }

  return (
    <div className="max-w-5xl mx-auto">
      <H2>Word Generator</H2>
      <Accordion type="single" collapsible>
        <AccordionItem value="random-username">
          <AccordionTrigger>Random Username</AccordionTrigger>
          <AccordionContent>
            <Form {...usernameForm}>
              <form
                onSubmit={usernameForm.handleSubmit(randomUsernameSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={usernameForm.control}
                  name="wordsType"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormDescription>
                          Select the items you want to use in your username.
                        </FormDescription>
                      </div>
                      {Object.keys(words).map((wordProperty) => (
                        <FormField
                          key={wordProperty}
                          control={usernameForm.control}
                          name="wordsType"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={wordProperty}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      wordProperty
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            wordProperty,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value: any) =>
                                                value !== wordProperty
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal capitalize">
                                  {wordProperty}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Generate Username</Button>
              </form>
            </Form>
            <GeneratedWord word={generatedUsername} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="fake-word">
          <AccordionTrigger>Fake Word</AccordionTrigger>
          <AccordionContent>
            <Form {...randomWordForm}>
              <form
                onSubmit={randomWordForm.handleSubmit(randomWordSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={randomWordForm.control}
                  name="wordLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormDescription>
                        How long should your word be?
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
                          type="number"
                          min={0}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Generate Fake Word</Button>
              </form>
            </Form>
            <GeneratedWord word={generatedFakeWord} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function GeneratedWord({ word }: { word: string }) {
  const { toast } = useToast();

  return (
    <>
      {word && (
        <div className="bg-muted/50 flex flex-row items-center p-3 mt-4 rounded-md gap-4">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              toast({ description: "Copied to clipboard!" });
            }}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
          <H3 className="font-mono">{word}</H3>
        </div>
      )}
    </>
  );
}
