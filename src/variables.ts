import Modern from "@/emails/modern";
import Ancient from "@/emails/ancient";

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
