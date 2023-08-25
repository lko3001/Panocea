import { withAuth } from "next-auth/middleware";
// export { withAuth } from "next-auth/middleware";

//ideally the matcher should be:
// data.routes.filter(route => route.requiresLogin).map(route => route.slug)

export default withAuth({
  pages: {
    signIn: "/auth/signIn",
  },
});

export const config = { matcher: "/todo" };
