import { Link } from "react-router";
import styles from "./HeaderBrand.module.css";
import { useTranslation } from "react-i18next";

const HeaderBrand = () => {
    const { t } = useTranslation("common");

    return (
        <Link
            className={styles.brandContainer}
            to='/'
            aria-label={`${t('brand.name')} ${t('nav.home')}`}
        >
            <div className={styles.brandBox} aria-hidden="true"/>
            <span className={styles.brandName}>{t('brand.name')}</span>
        </Link>
    )
};

export default HeaderBrand;
