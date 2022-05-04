import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import styles from '../../styles/pages/posts.module.scss'

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
                        <a href="#" key={post.title}>
                            <time>{post.updatedAt}</time>
                            <strong>
                                {post.title}
                            </strong>
                            <p>
                                {post.excerpt}
                            </p>
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}


export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.getByType('publication')
    console.log("response => ", response)
    
    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        };
    })

    return {
        props: {
            posts,
        },
    };
}