import { prisma } from "@/prisma/client";
import { CrudBody, Data, PrismaCleared } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: CrudBody<PrismaCleared> = await req.json();

  switch (body.method) {
    case "update":
    case "create":
      // @ts-ignore
      const newElement = await prisma[body.where].upsert({
        where: {
          id: body.method === "create" ? "" : body.what.id,
        },
        update: body.what,
        create: body.what,
      });
      return NextResponse.json(newElement);
      break;
    case "deleteMany":
      // @ts-ignore
      const deletedElement = await prisma[body.where].deleteMany({
        where: {
          id: {
            in: body.what,
          },
        },
      });
      return NextResponse.json(deletedElement);
      break;
  }
}