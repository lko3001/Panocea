"use client";
import Parser from "rss-parser";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Data, YoutubeFeed, YtEntry } from "@/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  ChevronDownIcon,
  Cross1Icon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { useGlobal } from "@/components/context/GlobalContext";
import { H2 } from "@/components/ui/typography";

type Feed = {
  [key: string]: any;
} & Parser.Output<{
  [key: string]: any;
}>;

interface Item {
  author?: string;
  id?: string;
  isoDate: string;
  link?: string;
  pubDate?: string;
  title?: string;
}

interface YtFeedExtended extends YoutubeFeed {
  youtube: true;
}
interface YtEntryExtended extends YtEntry {
  youtube: true;
}

export default function RssFeeds() {
  const parser = new Parser();
  const [items, setItems] = useState<Item[]>([]);
  const [feeds, setFeeds] = useState<(Feed | YtFeedExtended)[]>([]);
  const [showRss, setShowRss] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { userData, Crud } = useGlobal();

  const router = useRouter();

  function createFeed() {
    if (inputRef.current && inputRef.current.value) {
      // Crud({
      //   what: { link: inputRef.current.value },
      //   where: "rssfeeds",
      //   method: "create",
      //   fileData: fileData,
      // }).then(() => router.refresh());
      inputRef.current.value = "";
    }
  }

  // useEffect(() => {
  //   const fetchFeeds = async () => {
  //     const promises = data.rssfeeds
  //       .filter((el) => !el.link.includes("youtube.com"))
  //       .map(async (rssFeed) => {
  //         const feed = await parser.parseURL(rssFeed.link);
  //         return feed;
  //       });

  //     const resolvedFeeds = await Promise.all(promises);

  //     const res = await fetch("/api/rss", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         feeds: data.rssfeeds.filter((el) => el.link.includes("youtube.com")),
  //       }),
  //     });
  //     const youtubeFeeds = await res.json();
  //     const youtubeFeedsArray: YtFeedExtended[] = youtubeFeeds.data.map(
  //       (el: YoutubeFeed) => ({ youtube: true, ...el })
  //     );

  //     setFeeds((prev) => [...prev, ...resolvedFeeds, ...youtubeFeedsArray]);
  //   };

  //   fetchFeeds();
  // }, []);

  useEffect(() => {
    if (feeds.length && !items.length) {
      const empty: any = [];
      setItems(
        empty.concat(
          feeds
            .map((item: any) =>
              item.youtube
                ? item.feed.entry.map((el: any) => ({ ...el, youtube: true }))
                : item.items
            )
            .flat()
            .sort((a: YtEntryExtended | Feed, b: YtEntryExtended | Feed) => {
              if (a.youtube && !b.youtube) {
                const yta = a as YtEntryExtended;
                const fb = b as Feed;
                return (
                  new Date(fb.isoDate).getTime() -
                  new Date(yta.published[0]).getTime()
                );
              } else if (!a.youtube && b.youtube) {
                const fa = a as Feed;
                const ytb = b as YtEntryExtended;
                return (
                  new Date(ytb.published[0]).getTime() -
                  new Date(fa.isoDate).getTime()
                );
              } else if (a.youtube && b.youtube) {
                const yta = a as YtEntryExtended;
                const ytb = b as YtEntryExtended;
                return (
                  new Date(ytb.published[0]).getTime() -
                  new Date(yta.published[0]).getTime()
                );
              } else {
                const fa = a as Feed;
                const fb = b as Feed;
                return (
                  new Date(fb.isoDate).getTime() -
                  new Date(fa.isoDate).getTime()
                );
              }
            })
        )
      );
    }
  }, [feeds]);

  return (
    <div className="mx-auto max-w-3xl">
      <H2 className="mb-6">Finance</H2>

      <div className="flex flex-row gap-1 mb-8">
        <Input
          type="text"
          placeholder="What do I have to do?"
          autoFocus
          className="mr-1"
          ref={inputRef}
        />
        <Button onClick={createFeed}>Create</Button>
        <Button
          onClick={() => setShowRss((p) => !p)}
          size={"icon"}
          variant={"secondary"}
          className="aspect-square"
        >
          <ArrowDownIcon />
        </Button>
      </div>
      {showRss && (
        <div className="flex flex-col gap-4 mb-8">
          {userData.user.rssFeeds.map((feed) => (
            <div className="flex flex-row items-center" key={feed.link}>
              <Button
                onClick={() => {
                  Crud({
                    method: "deleteMany",
                    where: "rssFeed",
                    what: [feed.id!],
                  });
                  router.push("/rss-feeds");
                }}
                variant={"destructive"}
                className="aspect-square p-0 h-5 mr-2"
              >
                <Cross2Icon className="h-3 w-3" />
              </Button>
              <p className="items-center rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                {feed.link}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-4">
        {items.map((element) => {
          if (element.hasOwnProperty("youtube")) {
            const item: YtEntry = element as any;
            const videoId = item["yt:videoId"][0];
            return (
              <Card key={videoId}>
                {item.link && item.title && (
                  <CardHeader>
                    <div className="mb-3">
                      <img
                        className="h-24 aspect-video object-cover w-auto"
                        style={{
                          width:
                            item["media:group"][0]["media:thumbnail"][0].$
                              .width,
                          height:
                            item["media:group"][0]["media:thumbnail"][0].$
                              .height,
                        }}
                        src={item["media:group"][0]["media:thumbnail"][0].$.url}
                        alt=""
                      />
                    </div>
                    <CardTitle>
                      <Link href={`https://www.youtube.com/watch?v=${videoId}`}>
                        {item.title[0]}
                      </Link>
                    </CardTitle>
                    <CardDescription className="flex flex-row items-center justify-between">
                      <Link href={item.author[0].uri[0]}>
                        {item.author[0].name[0]}
                      </Link>
                      {new Intl.DateTimeFormat("it-IT", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      }).format(new Date(item.published[0]))}
                    </CardDescription>
                  </CardHeader>
                )}
              </Card>
            );
          } else {
            const item: Item = element;
            return (
              <Card key={item.link}>
                {item.link && item.title && (
                  <CardHeader>
                    <CardTitle>
                      <Link href={item.link}>{item.title}</Link>
                    </CardTitle>
                    <CardDescription className="flex flex-row items-center justify-between">
                      <span>{item.author}</span>
                      {new Intl.DateTimeFormat("it-IT", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      }).format(new Date(item.isoDate))}
                    </CardDescription>
                  </CardHeader>
                )}
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}
