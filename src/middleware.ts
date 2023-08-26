import { withAuth } from "next-auth/middleware";
// export { default } from "next-auth/middleware";

// preferably the matcher should be:
// data.routes.filter(route => route.requiresLogin).map(route => route.slug)

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = { matcher: ["/todo", "/finance", "/rss-feeds"] };
