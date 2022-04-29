import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

type HeaderProps = {}

export const Header = (props: HeaderProps) => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
            <nav>
                <a href="#" className={styles.active}>Home</a>
                <a href="#">Posts</a>
            </nav>
                <SignInButton />
            </div>
        </header>
    )
}