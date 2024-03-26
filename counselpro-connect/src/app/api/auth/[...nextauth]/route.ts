import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models";
import { connectDB } from "@/utils";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                //Check if the user exists.
                await connectDB();

                try {
                    let user = await User.findOne({
                        email: credentials?.email || "",
                    });

                    if (user) {

                        const isPasswordCorrect = credentials?.password === user?.password;

                        if (isPasswordCorrect) {
                            user = { email: user.email };
                            return user;
                        } else {
                            throw new Error("Wrong Credentials!");
                        }
                    } else {
                        throw new Error("User not found!");
                    }
                } catch (err: any) {
                    throw new Error("database error");
                }
            },
            credentials: undefined
        }),

        // GithubProvider({
        //   clientId: process.env.GITHUB_ID,
        //   clientSecret: process.env.GITHUB_SECRET,
        // }),
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_CLIENT_ID,
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
    ],
    pages: {
        error: "/login",
    },

});

export { handler as GET, handler as POST };