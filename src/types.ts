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

export interface Data {
  routes: Route[];
  todos: Todo[];
  rssfeeds: RssFeed[];
}

export interface FinanceItem {
  id: string;
  price: number;
  title: string;
  description: string;
  category: string;
  type: "entry" | "loss";
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
