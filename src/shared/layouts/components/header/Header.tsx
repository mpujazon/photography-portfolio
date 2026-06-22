import { useState } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "./navLinks.ts";
import { NavLink } from "react-router";
import styles from "./Header.module.css";
import HeaderBrand from "../header-brand/HeaderBrand.tsx";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
] as const;

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation("common");

    return (
        <>
        <header className={styles.container}>
            <HeaderBrand />

            <div className={styles.rightGroup}>
            <nav
                className={styles.navDesktop}
                aria-label={t('nav.ariaLabel')}
            >
                {navLinks.map(link => (
                    <NavLink
                        className={styles.navLink}
                        key={link.path}
                        to={link.path}
                    >
                        {t(link.keyLabel)}
                    </NavLink>
                ))}
            </nav>

            <div className={styles.headerActions}>
                <div className={styles.langSwitcher}>
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            className={`${styles.langBtn} ${i18n.language === lang.code ? styles.langBtnActive : ""}`}
                            onClick={() => i18n.changeLanguage(lang.code)}
                            disabled={i18n.language === lang.code}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ""}`}
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                >
                    <span className={styles.line} aria-hidden="true" />
                    <span className={styles.line} aria-hidden="true" />
                    <span className={styles.line} aria-hidden="true" />
                </button>
            </div>
            </div>

        </header>

        {createPortal(
            <div
                id="mobile-navigation"
                className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
            >
                <nav
                    className={styles.mobileNav}
                    aria-label={t('nav.ariaLabel')}
                >
                    {navLinks.map(link => (
                        <NavLink
                            className={styles.navLink}
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                        >
                            {t(link.keyLabel)}
                        </NavLink>
                    ))}
                </nav>
            </div>,
            document.body
        )}
        </>
    );
}

export default Header;