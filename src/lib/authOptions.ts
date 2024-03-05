import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch(
            "https://ariva.bright-lab.com/admin/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          if (!response.ok) {
            return null;
          }

          const result = await response.json();

          return result;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    // error:
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (user && account) {
        return {
          id: user.id,
          token: user.token,
          refresh_token: user.refresh_token,
          expiry: user?.expiry,
        };
      }
      return token;
    },

    async session({ token }: any) {
      return token;
    },
  },
};
