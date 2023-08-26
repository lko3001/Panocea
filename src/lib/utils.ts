import { prisma } from "@/prisma/client";
import { Data } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GetCategories(array: Data[keyof Data]) {
  return Array.from(new Set(array.map((element) => element.category)));
}
