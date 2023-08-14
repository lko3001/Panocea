export interface Todo {
  id: string;
  text: string;
  pinned: boolean;
}

export interface Route {
  slug: string;
  name: string;
  category: string;
}

export interface RssFeed {
  link: string;
}

export interface FinanceItem {
  id: string;
  price: number;
  title: string;
  description: string | undefined;
  category: string;
  type: "entry" | "loss";
}

type Category = { [key in keyof Omit<Data, "categories">]: string[] };

export interface Data {
  routes: Route[];
  todos: Todo[];
  rssfeeds: RssFeed[];
  finance: FinanceItem[];
  categories: Category;
}

export type CrudArguments<T extends keyof Data> = {
  where: T;
  fileData: FileProps;
} & (
  | ({
      method: "create";
      what: Data[T] extends (infer T)[] ? T : string;
    } & (Data[T] extends (infer G)[] ? {} : { fieldName: keyof Data[T] }))
  | ({ method: "delete"; id: string } & (Data[T] extends (infer T)[]
      ? { fieldName: keyof T }
      : { fieldName: keyof Data[T] }))
  | ({
      method: "deleteMany";
      array: Data[T] extends (infer G)[] ? Data[T] : string[];
    } & (Data[T] extends (infer T)[]
      ? { fieldName: keyof T }
      : { fieldName: keyof Data[T] }))
);

export interface FileProps {
  contents: Data;
  file: File;
  fileHandle: FileSystemFileHandle;
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
