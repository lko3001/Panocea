import { prisma } from "@/prisma/client";
import { Data } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GetCategories(array: any[]) {
  return Array.from(new Set(array.map((element) => element.category)));
}

export function randomChoice(array: any[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export function splitByVowels(word: string) {
  const vowels = ["a", "e", "i", "o", "u", "y"];
  let splittedWord = word.toLocaleLowerCase();
  vowels.map(
    (vowel) => (splittedWord = splittedWord.replaceAll(vowel, `${vowel} `))
  );
  return splittedWord.split(" ");
}

export function getRandomIntInRange(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function compareDate(a: any, b: any) {
  if (a.updatedAt === undefined && b.updatedAt === undefined) {
    return 0;
  } else if (a.updatedAt === undefined) {
    return -1;
  } else if (b.updatedAt === undefined) {
    return 1;
  }
  return new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime();
}
