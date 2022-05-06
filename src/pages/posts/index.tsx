import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import styles from '../../styles/pages/posts.module.scss'
import Link from 'next/link'

type PostsProps = {
    posts: Post[];
};

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <Link href={`/posts/${post.slug}`} key={post.title} passHref>
                            <a>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}


export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.getByType('publication')
    
    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: RichText.asText(post.data.content).slice(0, 350) + "...",
            updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-br", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
        };
    })

    return {
        props: {
            posts,
        },
        revalidate: 25, // 25 seconds
    };
}