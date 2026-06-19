import { useState } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "./navLinks.ts";
import { NavLink } from "react-router";
import styles from "./Header.module.css";
import HeaderBrand from "../header-brand/HeaderBrand.tsx";
import { useTranslation } from "react-i18next";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("common");

    return (
        <>
        <header className={styles.container}>
            <HeaderBrand />

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