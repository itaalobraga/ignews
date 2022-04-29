import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization:
                "https://github.com/login/oauth/authorize?scope=read:user+user:email",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user;

            try {
                fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
                            )
                        ),
                        q.Create(q.Collection("users"), { data: { email } }),
                        q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
                    )
                );
                return true
            } catch (error) {
                return false
            }

        },
    },
    secret: process.env.SIGNING_KEY,
});
