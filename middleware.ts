import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  matcher: ["/chat", "/chat/:path*", "/notes", "/notes/:path*"],
};
