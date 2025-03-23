import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { API_URL } from "@/app/utils/config";
import { cookies } from 'next/headers'

async function login(credentials) {
  try {
    const formData = new FormData();
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    const response = await fetch(`${API_URL}/signin.php`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.code == 400) {
      cookies().set('authres', data.message)
    }
    return data
  } catch (error) {
    throw new Error(error.message);
  }
}

export const authOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          if (user.code === 200) {
            return user
          } else {
            return null
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
