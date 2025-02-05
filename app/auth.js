import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectToDB } from "@/app/lib/utils"
import { User } from "@/app/lib/models"
import bcrypt from "bcrypt"

const login = async (credentials) => {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("User not found");

    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrectPassword) throw new Error("Incorrect password");

    return user;
}
 
export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
        async authorize(credentials) {
            try {
                // console.log("login");
                const user = await login(credentials);
                return user;
            }
            catch(error) {
                // console.log("catching error");
                return null;
            }
        },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            // console.log("jwt");
            if (user) {
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({session, token}) {
            // console.log("session");
            if (token) {
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        }
    }
})