import styles from './Navbar.module.css'

type Props = {
    resetChoice: () => void
}

const Navbar = ({ resetChoice }: Props) => {
    return (
        <nav className={styles.navbar}>
            <a className={styles.logo}
                onClick={
                    (e) => {
                        e.preventDefault()
                        resetChoice()
                    }
                }
            >CatDog</a>
        </nav>
    )
}

export default Navbar