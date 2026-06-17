import { Link } from 'react-router';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <Link
                className={styles.brandContainer}
                to='/'
                aria-label={`LensByMike home`}
            >
                <div className={styles.brandBox} aria-hidden="true" />
                <span className={styles.brandName}>LENSBYMIKE</span>
            </Link>
        </footer>
    );
}

export default Footer;