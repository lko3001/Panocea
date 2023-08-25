import { prisma } from "@/prisma/client";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: Session = await request.json();
  try {
    if (!body.user?.email)
      throw new Error(
        "User email not found, it means that probably the user is not logged in"
      );

    const user = await prisma.user.findUnique({
      where: { email: body.user.email },
      include: {
        finances: true,
        todos: true,
        rssfeeds: true,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
