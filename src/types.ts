import { prisma } from "@/prisma/client";

interface IdStuff {
  id?: string;
  userId?: string;
}

export interface Todo extends IdStuff {
  text: string;
  pinned: boolean;
  category?: string;
}

export interface Route {
  slug: string;
  name: string;
  category: string;
  requiresLogin: boolean;
}

export interface RssFeed extends IdStuff {
  link: string;
  category?: string;
}

export interface FinanceItem extends IdStuff {
  price: number;
  title: string;
  description: string | undefined;
  category: string;
  type: "entry" | "loss";
}

// type Category = { [key in keyof Omit<Data, "categories">]: string[] };

// type CrudBody<T> = {} & (
//   | {
//       method: "create";
//       id: string | undefined;
//       what: keyof Data[number];
//       fieldName: keyof Data;
//     }
//   | { method: "delete"; id: string }
// );

export interface UserData {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: null | string;
    image: string;
    // categories: Category & IdStuff;
  } & Data;
}

export interface Data {
  todos: Todo[];
  rssFeeds: RssFeed[];
  finances: FinanceItem[];
  // categories: Category;
}

export interface PomodoroTimers {
  pomodoro: number;
  break: number;
}

export interface Pomodoro {
  timers: PomodoroTimers;
  stage: keyof PomodoroTimers;
  isRunning: boolean;
  finishTime: string | undefined;
}

export type IncreaseOrDecrease = "increase" | "decrease";

export interface EmailTemplateProps {
  title: string;
  text: string;
  fromEmail: string;
  toEmail: string;
}

export type NoDollarSignOrSymbol<T> = T extends
  | `$${infer _}`
  | symbol
  | "account"
  | "session"
  | "user"
  | "verificationToken"
  ? never
  : T;

export type Pluralize<T extends string> = `${T}s`;
export type PrismaCleared = NoDollarSignOrSymbol<keyof typeof prisma>;

export type CrudBody<T extends PrismaCleared> = {
  where: T;
} & (
  | {
      method: "create";
      what: Data[Pluralize<T>][number] & { userId: string };
    }
  | {
      method: "update";
      what: Data[Pluralize<T>][number] & { userId: string; id: string };
    }
  | { method: "deleteMany"; what: string[] }
);

export interface YoutubeFeed {
  feed: {
    $: {
      "xmlns:yt": string;
      "xmlns:media": string;
      xmlns: string;
    };
    link: {
      $: { rel: "self" | "alternate"; href: string };
    }[];
    id: [string];
    "yt:channelId": [string];
    title: [string];
    author: [
      {
        name: [string];
        uri: [string];
      }
    ];
    published: [string];
    entry: YtEntry[];
  };
}

export interface YtEntry {
  id: [string];
  "yt:videoId": [string]; // use this as an id
  "yt:channelId": [string];
  title: [string];
  link: [
    {
      $: {
        rel: string;
        href: string;
      };
    }
  ];
  author: [
    {
      name: [string];
      uri: [string];
    }
  ];
  published: [string];
  updated: [string];
  "media:group": [
    {
      "media:title": [string];
      "media:content": [
        {
          $: {
            url: string;
            type: string;
            width: `${number}`;
            height: `${number}`;
          };
        }
      ];
      "media:thumbnail": [
        {
          $: {
            url: string;
            width: `${number}`;
            height: `${number}`;
          };
        }
      ];
      "media:description": [string];
      "media:community": [
        {
          "media:starRating": [
            {
              $: {
                count: `${number}`;
                average: `${number}`;
                min: `${number}`;
                max: `${number}`;
              };
            }
          ];
          "media:statistics": [
            {
              $: {
                views: `${number}`;
              };
            }
          ];
        }
      ];
    }
  ];
}
