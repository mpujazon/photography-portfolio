import { useState, useEffect } from 'react';
import { useAdminConfig, useUpdateConfig } from '../hooks/useAdminConfig.ts';
import styles from './AdminPage.module.css';

const CONFIG_FIELDS: { key: string; label: string; multiline?: boolean }[] = [
    { key: 'brandLine1', label: 'Brand line 1 (e.g. LENS)' },
    { key: 'brandBy', label: 'Brand "by" word (e.g. BY)' },
    { key: 'brandLine2', label: 'Brand line 2 (e.g. MIKE)' },
    { key: 'heroLabel', label: 'Hero eyebrow label' },
    { key: 'heroSubtitle', label: 'Hero subtitle' },
    { key: 'heroParagraph', label: 'Hero bio paragraph', multiline: true },
];

export function SettingsAdminPage() {
    const { data: config = [], isLoading } = useAdminConfig();
    const updateConfig = useUpdateConfig();
    const [values, setValues] = useState<Record<string, string>>({});

    useEffect(() => {
        const initial: Record<string, string> = {};
        config.forEach(e => { initial[e.key] = e.value; });
        setValues(initial);
    }, [config]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        updateConfig.mutate(values);
    }

    if (isLoading) return <p className={styles.loading}>Loading…</p>;

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Site settings</h1>

            <form className={styles.settingsForm} onSubmit={handleSubmit}>
                {CONFIG_FIELDS.map(({ key, label, multiline }) => (
                    <label key={key} className={styles.settingsLabel}>
                        {label}
                        {multiline ? (
                            <textarea
                                className={`${styles.input} ${styles.textarea}`}
                                value={values[key] ?? ''}
                                onChange={e => setValues(prev => ({ ...prev, [key]: e.target.value }))}
                                rows={4}
                            />
                        ) : (
                            <input
                                className={styles.input}
                                value={values[key] ?? ''}
                                onChange={e => setValues(prev => ({ ...prev, [key]: e.target.value }))}
                            />
                        )}
                    </label>
                ))}

                <button className={styles.btnPrimary} type="submit" disabled={updateConfig.isPending}>
                    {updateConfig.isPending ? 'Saving…' : 'Save changes'}
                </button>
                {updateConfig.isSuccess && <p className={styles.success}>Saved.</p>}
            </form>
        </div>
    );
}
