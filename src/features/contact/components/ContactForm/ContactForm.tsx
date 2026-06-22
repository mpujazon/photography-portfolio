import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../../../shared/components/buttons/primary/PrimaryButton.tsx";
import { sendContactEnquiry } from "../../../../shared/api/endpoints/contact.ts";
import styles from "./ContactForm.module.css";

const EMPTY_FIELDS = { name: "", email: "", type: "", message: "" };

function ContactForm() {
    const { t } = useTranslation("contact");
    const [fields, setFields] = useState(EMPTY_FIELDS);

    const mutation = useMutation({
        mutationFn: sendContactEnquiry,
        onSuccess: () => setFields(EMPTY_FIELDS),
    });

    function handleChange(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.currentTarget;
        setFields(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        mutation.mutate(fields);
    }

    return (
        <section className={styles.section}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label={t("form.ariaLabel")}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">{t("form.nameLabel")}</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={styles.input}
                        placeholder={t("form.namePlaceholder")}
                        value={fields.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        aria-required="true"
                        disabled={mutation.isPending}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">{t("form.emailLabel")}</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={styles.input}
                        placeholder={t("form.emailPlaceholder")}
                        value={fields.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        aria-required="true"
                        disabled={mutation.isPending}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="type">{t("form.typeLabel")}</label>
                    <input
                        id="type"
                        name="type"
                        type="text"
                        className={styles.input}
                        placeholder={t("form.typePlaceholder")}
                        value={fields.type}
                        onChange={handleChange}
                        disabled={mutation.isPending}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="message">{t("form.messageLabel")}</label>
                    <textarea
                        id="message"
                        name="message"
                        className={styles.textarea}
                        placeholder={t("form.messagePlaceholder")}
                        value={fields.message}
                        onChange={handleChange}
                        rows={8}
                        required
                        aria-required="true"
                        disabled={mutation.isPending}
                    />
                </div>

                {mutation.isError && (
                    <p className={styles.errorMessage} role="alert">
                        {t("form.error")}
                    </p>
                )}

                {mutation.isSuccess && (
                    <p className={styles.successMessage} role="status">
                        {t("form.success")}
                    </p>
                )}

                <PrimaryButton
                    type="submit"
                    label={mutation.isPending ? t("form.sending") : t("form.submit")}
                    className={styles.submitButton}
                    disabled={mutation.isPending}
                />
            </form>

            <div className={styles.infoPanel} role="complementary" aria-label={t("info.ariaLabel")}>
                <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>{t("info.emailLabel")}</p>
                    <a
                        className={styles.infoValue}
                        href={`mailto:${t("info.email")}`}
                    >
                        {t("info.email")}
                    </a>
                </div>
                <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>{t("info.instagramLabel")}</p>
                    <a
                        className={styles.infoValue}
                        href={`https://instagram.com/${t("info.instagram").replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("info.instagram")}
                    </a>
                </div>
                <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>{t("info.locationLabel")}</p>
                    <p className={styles.infoValue}>{t("info.location")}</p>
                </div>
                <div className={styles.infoRow}>
                    <p className={styles.infoLabel}>{t("info.availableLabel")}</p>
                    <p className={styles.infoValue}>{t("info.available")}</p>
                </div>
            </div>
        </section>
    );
}

export default ContactForm;
