"use client";

import data from "@/data.json";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useGlobal } from "../context/GlobalContext";
import { Data } from "@/types";

export default function Addressbar() {
  const routeCategories: string[] = Array.from(
    new Set(data.routes.map((route) => route.category))
  ).filter((el) => Boolean(el));

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {routeCategories.map((category) => (
          <NavigationMenuItem key={category}>
            <NavigationMenuTrigger
              id={category}
              aria-controls={category}
              className="capitalize"
            >
              {category}
            </NavigationMenuTrigger>

            <NavigationMenuContent id={category} aria-controls={category}>
              <ul
                className={`grid w-[400px] gap-3 p-4 md:w-[500px] ${
                  data.routes.filter((route) => route.category === category)
                    .length !== 1
                    ? "md:grid-cols-2"
                    : ""
                } lg:w-[600px]`}
              >
                {data.routes
                  .filter((route) => route.category === category)
                  .map((route) => (
                    <ListItem
                      key={route.slug}
                      title={route.name}
                      href={route.slug}
                    >
                      {route.slug}
                    </ListItem>
                  ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      {/* <NavigationMenuLink> */}
      <Link
        href={props.href!}
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground capitalize",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
      {/* </NavigationMenuLink> */}
    </li>
  );
});
ListItem.displayName = "ListItem";
