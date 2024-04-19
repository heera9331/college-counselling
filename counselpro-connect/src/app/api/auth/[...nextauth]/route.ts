import NextAuth from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models";
import { connectDB } from "@/utils";

const handler = NextAuth({
    providers: [
        CredentialsProvider<any>({
            id: "credentials",
            name: "Credentials",
            credentials: {
                // Define your credential input type here
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Check if the user exists.
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
                    throw new Error("Database error");
                }
            },
        }),
    ],
    pages: {
        error: "/login",
    },
});

export { handler as GET, handler as POST };
