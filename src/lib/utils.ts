import { prisma } from "@/prisma/client";
import { Data } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export async function Crud<T extends PrismaCleared>(props: CrudBody<T>) {
//   const res = await fetch("/api/crud", {
//     method: "POST",
//     body: JSON.stringify(props),
//   });
//   const data = await res.json();
//   return data;
// }

export function GetCategories(array: Data[keyof Data]) {
  return Array.from(new Set(array.map((element) => element.category)));
}

// type NoDollarSignOrSymbol<T> = T extends
//   | `$${infer _}`
//   | symbol
//   | "account"
//   | "session"
//   | "user"
//   | "verificationToken"
//   ? never
//   : T;

// type Pluralize<T extends string> = `${T}s`;
// export type PrismaCleared = NoDollarSignOrSymbol<keyof typeof prisma>;

// export type CrudBody<T extends PrismaCleared> = {
//   where: T;
// } & (
//   | {
//       method: "create";
//       what: Data[Pluralize<T>][number] & { userId: string };
//     }
//   | {
//       method: "update";
//       what: Data[Pluralize<T>][number] & { userId: string; id: string };
//     }
//   | { method: "deleteMany"; what: string[] }
// );
