import { Monospace } from "@/components/ui/typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center w-screen h-screen fixed top-0 left-0">
      <div className="flex flex-col items-center gap-5">
        <span className="text-7xl">{"¯\\_(ツ)_/¯"}</span>
        <p className="text-xl">There's nothing here</p>
        <p>
          Go back{" "}
          <Link href={"/"} className="underline">
            home
          </Link>
        </p>
      </div>
    </div>
  );
}
