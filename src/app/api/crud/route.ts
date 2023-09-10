import { prisma } from "@/prisma/client";
import { CrudBody, Data, PrismaBody, PrismaCleared } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: PrismaBody<PrismaCleared> = await req.json();

  switch (body.method) {
    case "upsert":
      // @ts-ignore
      const newElement = await prisma[body.where].upsert({
        where: {
          id: body.what.id ? body.what.id : "",
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
