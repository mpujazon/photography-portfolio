import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth.ts';
import styles from './AdminLayout.module.css';

export function AdminLayout() {
    const { logout } = useAuth();

    return (
        <div className={styles.shell}>
            <aside className={styles.sidebar}>
                <p className={styles.sidebarBrand}>Admin</p>
                <nav className={styles.sidebarNav}>
                    <NavLink className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`} to="/admin/albums">Albums</NavLink>
                    <NavLink className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`} to="/admin/photos">Photos</NavLink>
                    <NavLink className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`} to="/admin/settings">Settings</NavLink>
                </nav>
                <button className={styles.logoutBtn} type="button" onClick={logout}>Log out</button>
            </aside>
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
}
