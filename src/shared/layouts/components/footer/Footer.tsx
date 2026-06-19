import { Link } from 'react-router';
import style from './Footer.module.css';
import { useTranslation } from 'react-i18next';
import { Icon500px, IconInstagram, IconMail } from '../../../components/icons';

function Footer() {
    const { t } = useTranslation('common');
    return (
        <footer className={style.footer}>
            <div className={style.brandContainer}>
                <Link
                    className={style.brandContainer}
                    to='/'
                    aria-label={`${t('brand.name')} ${t('nav.home')}`}
                >
                    <p className={style.brandName}>
                        LENS<span className={style.yellow}>BY</span>MIKE
                    </p>
                </Link>
                <p className={style.tagline}>{t('footer.tagline')}</p>
                <p className={style.eyebrow}>
                    {t('footer.eyebrow')}
                </p>
            </div>
            <nav className={style.social} aria-label={t('footer.socialAriaLabel')}>
                <a
                    className={style.socialLink}
                    href="https://www.instagram.com/lensbyMike"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('footer.instagram')}
                >
                    <IconInstagram />
                </a>
                <a
                    className={style.socialLink}
                    href="https://500px.com/p/lensbyMike"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('footer.px500')}
                >
                    <Icon500px />
                </a>
                <a
                    className={style.socialLink}
                    href="mailto:lensbymike.media@gmail.com"
                    aria-label={t('footer.email')}
                >
                    <IconMail />
                </a>
            </nav>
            <p className={style.copyright}>
                {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
        </footer>
    );
}

export default Footer;
