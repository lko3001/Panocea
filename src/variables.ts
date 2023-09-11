import Modern from "@/emails/modern";
import Ancient from "@/emails/ancient";
import {
  BackpackIcon,
  CheckIcon,
  ClockIcon,
  EnvelopeClosedIcon,
  HomeIcon,
  Pencil1Icon,
  Pencil2Icon,
  Share1Icon,
  TextIcon,
} from "@radix-ui/react-icons";

export const templates = [
  {
    image: "/modern-email-thumbnail.png",
    name: "modern",
    element: Modern,
  },
  {
    image: "/ancient-email-thumbnail.png",
    name: "Ancient",
    element: Ancient,
  },
] as const;

export const routes = [
  {
    slug: "/todo",
    name: "To Do List",
    category: "productivity",
    requiresLogin: true,
    icon: CheckIcon,
  },
  {
    slug: "/word-generator",
    name: "Word Generator",
    category: "tools",
    requiresLogin: true,
    icon: TextIcon,
  },
  {
    slug: "/rss-feeds",
    name: "Rss Feeds",
    category: "news",
    requiresLogin: true,
    icon: Share1Icon,
  },
  {
    slug: "/finance",
    name: "Finance",
    category: "productivity",
    requiresLogin: true,
    icon: BackpackIcon,
  },
  {
    slug: "/pomodoro",
    name: "Pomodoro",
    category: "productivity",
    requiresLogin: false,
    icon: ClockIcon,
  },
  {
    slug: "/notes",
    name: "Notes",
    category: "productivity",
    requiresLogin: true,
    icon: Pencil1Icon,
  },
  {
    slug: "/text-editor",
    name: "Text Editor",
    category: "tools",
    requiresLogin: true,
    icon: Pencil2Icon,
  },
  {
    slug: "/",
    name: "Home",
    category: "other",
    requiresLogin: false,
    icon: HomeIcon,
  },
  // {
  //   slug: "/email",
  //   name: "Email",
  //   category: "tools",
  //   requiresLogin: false,
  //   icon: EnvelopeClosedIcon,
  // },
];
