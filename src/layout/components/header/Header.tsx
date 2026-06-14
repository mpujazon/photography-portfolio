import { useState } from "react";
import { navLinks } from "./navLinks.ts";
import { NavLink } from "react-router";
import styles from "./Header.module.css";
import HeaderBrand from "../header-brand/HeaderBrand.tsx";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={styles.container}>
            <HeaderBrand brandName="LensByMike" />

            <nav className={styles.navDesktop}>
                {navLinks.map(link => (
                    <NavLink
                        className={styles.navLink}
                        key={link.path}
                        to={link.path}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <button
                className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ""}`}
                onClick={() => setIsOpen(prev => !prev)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                <span className={styles.line} />
                <span className={styles.line} />
                <span className={styles.line} />
            </button>

            <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}>
                <nav className={styles.mobileNav}>
                    {navLinks.map(link => (
                        <NavLink
                            className={styles.navLink}
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
