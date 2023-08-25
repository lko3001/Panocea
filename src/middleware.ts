export { default } from "next-auth/middleware";

//ideally the matcher should be:
// data.routes.filter(route => route.requiresLogin).map(route => route.slug)

export const config = { matcher: "/todo" };
