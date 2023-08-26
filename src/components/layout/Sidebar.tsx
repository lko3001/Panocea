import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { H4 } from "../ui/typography";
import data from "@/data.json";
import { Separator } from "../ui/separator";
import Link from "next/link";

const routeCategories: string[] = Array.from(
  new Set(data.routes.map((route) => route.category))
).filter((el) => Boolean(el));

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="break-all">
        <div className="mt-4">
          {routeCategories.map((category) => (
            <div>
              <H4 className="uppercase text-xs text-muted-foreground mb-2">
                {category}
              </H4>
              {data.routes
                .filter((route) => route.category === category)
                .map((route) => (
                  <Link href={route.slug} className="mb-1 block">
                    <H4 className="capitalize">{route.name}</H4>
                  </Link>
                ))}
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
