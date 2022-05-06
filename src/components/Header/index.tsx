import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

import Link from 'next/link'
import Image from 'next/image'
import { ActiveLink } from '../ActiveLink'

type HeaderProps = {}

export const Header = (props: HeaderProps) => {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/" passHref>
                    <a>
                    <Image src="/images/logo.svg" alt="ig.news" width={110} height={31} />
                    </a>
                </Link>
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/" passHref>
                        <a className={styles.active}>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts" passHref>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}