import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"


const admin = process.env.ADMIN_EMAIL

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ], callbacks: {
        async jwt({ token }) {
            token.role = token.email === admin ? "admin" : "user"
            return token
        },
        async session({ session, token }) {
            session.user.role = token.role as "admin" | "user"
            return session
        }
    }
}