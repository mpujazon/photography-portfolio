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

            <nav 
                className={styles.navDesktop}
                aria-label="Primary navigation"
            >
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
                aria-controls="mobile-navigation"
            >
                <span className={styles.line} aria-hidden="true" />
                <span className={styles.line} aria-hidden="true" />
                <span className={styles.line} aria-hidden="true" />
            </button>

            <div 
                id="mobile-navigation"
                className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
            >
                <nav 
                    className={styles.mobileNav}
                    aria-label="Mobile navigation"
                >
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
