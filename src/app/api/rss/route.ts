import { Data } from "@/types";
import { NextResponse } from "next/server";
import { parseString } from "xml2js";

interface Body {
  feeds: { link: string }[];
}

export async function POST(req: Request) {
  const body: Body = await req.json();

  const corsProxy = "https://cors.eu.org/";
  const ytResultPromises = body.feeds.map(async (feed) => {
    const res = await fetch(corsProxy + feed.link);
    const data = await res.text();

    return new Promise((resolve, reject) => {
      parseString(data, (e, r) => {
        if (e) {
          reject(e);
        } else {
          resolve(r);
        }
      });
    });
  });

  const ytResult = await Promise.all(ytResultPromises);
  return NextResponse.json({ data: ytResult });
}
