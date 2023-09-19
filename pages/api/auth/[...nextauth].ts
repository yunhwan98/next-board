import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "c3c72837ec4d976f9716",
      clientSecret: "cfc1f81cd151e80690c496033834634df88cc96f",
    }),
  ],
  secret: "qwer1234",
};
export default NextAuth(authOptions);
