export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({auth, request}) {
      // console.log("authorizing");
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if(isOnDashboard) {
        if(isLoggedIn) return true;
        return false;
      }
      else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    }
  },
  providers: [],
};