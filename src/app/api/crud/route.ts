import { Data } from "@/types";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

interface Body<T extends keyof Data> {
  where: T;
  what: any;
  id: string;
  fieldName: keyof Data[T][0];
  method: "create" | "delete";
}

export async function POST(req: Request) {
  const body: Body<keyof Data> = await req.json();

  const filePath = path.join(__dirname, "../../../../../src/data.json");
  const rawData: any = fs.readFileSync(filePath);
  const data: Data = JSON.parse(rawData);
  switch (body.method) {
    case "create": {
      data[body.where].push(body.what);
      break;
    }
    case "delete": {
      data[body.where] = (data[body.where] as []).filter(
        (element) => element[body.fieldName] !== body.id
      );
      break;
    }
    default: {
      console.log("ERROR: 'default' case run in src/app/api/crud/route.ts");
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ message: "success" });
}
