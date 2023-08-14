import Modern from "@/emails/modern";
import Ancient from "@/emails/ancient";

export const templates = [
  {
    image: "https://unsplash.it/500/500",
    name: "modern",
    element: Modern,
  },
  {
    image: "https://unsplash.it/500/500",
    name: "Ancient",
    element: Ancient,
  },
] as const;
