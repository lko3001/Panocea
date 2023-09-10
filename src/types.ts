import { prisma } from "@/prisma/client";
import { Note, RssFeed, Finance, Todo, User } from "@prisma/client";

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;
export type TodoFixed = MakeOptional<Todo, "updatedAt" | "id">;
export type RssFeedFixed = MakeOptional<RssFeed, "updatedAt" | "id">;
export type FinanceFixed = MakeOptional<Finance, "updatedAt" | "id">;
export type NoteFixed = MakeOptional<Note, "updatedAt" | "id">;

// interface IdStuff {
//   id?: string;
//   userId?: string;
//   updatedAt?: string;
// }

// export interface Todo extends IdStuff {
//   text: string;
//   pinned: boolean;
//   category?: string;
// }

// export interface Note extends IdStuff {
//   title: string;
//   description?: string;
//   content: string;
// }

export interface Route {
  slug: string;
  name: string;
  category: string;
  requiresLogin: boolean;
}

// export interface RssFeed extends IdStuff {
//   link: string;
//   category?: string;
// }

// export interface FinanceItem extends IdStuff {
//   price: number;
//   title: string;
//   description: string | undefined;
//   category: string;
//   type: "entry" | "loss";
// }

export interface UserData {
  user: User & Data;
}

export interface Data {
  todos: TodoFixed[];
  rssFeeds: RssFeedFixed[];
  finances: FinanceFixed[];
  notes: NoteFixed[];
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

export type PrismaBody<T extends PrismaCleared> = {
  where: T;
} & (
  | {
      method: "upsert";
      what: Data[Pluralize<T>][number] & {
        userId: string;
        id: string | undefined;
      };
    }
  // | {
  //     method: "create";
  //     what: Data[Pluralize<T>][number] & { userId: string };
  //   }
  // | {
  //     method: "update";
  //     what: Data[Pluralize<T>][number] & { userId: string; id: string };
  //   }
  | { method: "deleteMany"; what: string[] }
);
export type CrudBody<T extends Pluralize<PrismaCleared>> = {
  where: T;
} & (
  | {
      method: "upsert";
      what: Data[T][number] & { userId: string; id: string | undefined };
    }
  // | {
  //     method: "create";
  //     what: Data[T][number] & { userId: string };
  //   }
  // | {
  //     method: "update";
  //     what: Data[T][number] & { userId: string; id: string };
  //   }
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
