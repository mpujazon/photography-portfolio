import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import styles from './LoginPage.module.css';

export function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        login.mutate({ email, password });
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Admin</h1>

                {login.isError && (
                    <p className={styles.error}>Invalid credentials</p>
                )}

                <label className={styles.label}>
                    Email
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </label>

                <label className={styles.label}>
                    Password
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </label>

                <button className={styles.submit} type="submit" disabled={login.isPending}>
                    {login.isPending ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}
