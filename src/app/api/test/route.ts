import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const getUserId = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  });
  console.log(getUserId, session);

  if (getUserId) {
    const newCategory = await prisma.todo.create({
      data: {
        pinned: false,
        text: "Ciao amico mio",
        userId: getUserId.id,
      },
    });
    const boh = await prisma.finance.create({
      data: {
        category: "something",
        description: "lasdkfj",
        price: 3029,
        title: "laksdf",
        type: "entry",
        userId: getUserId.id,
      },
    });
    const boh2 = await prisma.rssFeed.create({
      data: {
        userId: getUserId.id,
        link: "https://www.theverge.com/rss/index.xml",
      },
    });
    const boh3 = await prisma.categories.upsert({
      where: {
        userId: getUserId.id,
      },
      create: { userId: getUserId.id },
      update: {
        todos: {
          push: "new todo",
        },
      },
    });

    return NextResponse.json({ getUserId, newCategory });
  } else {
    return NextResponse.json({ data: "F" });
  }
}
