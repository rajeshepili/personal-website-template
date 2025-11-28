import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { username, admin } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        nextCookies(),
        username({
            minUsernameLength: 5,
        }),
        admin()
    ]
});