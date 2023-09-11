import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { H4 } from "../ui/typography";
import { routes } from "@/variables";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { GetCategories } from "@/lib/utils";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden block mr-3">
        <Button variant="outline" size={"icon"}>
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="break-all">
        <div className="mt-4">
          {GetCategories(routes).map((category) => (
            <div>
              <H4 className="uppercase text-xs text-muted-foreground mb-2">
                {category}
              </H4>
              {routes
                .filter((route) => route.category === category)
                .map((route) => (
                  <Link
                    href={route.slug}
                    className="mb-1 block"
                    key={route.slug}
                  >
                    <SheetClose>
                      <H4 className="capitalize">{route.name}</H4>
                    </SheetClose>
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
