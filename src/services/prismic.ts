import * as prismic from "@prismicio/client";

export const getPrismicClient = () => {
    const client = prismic.createClient("ignewsxz", {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    });

    return client;
};
