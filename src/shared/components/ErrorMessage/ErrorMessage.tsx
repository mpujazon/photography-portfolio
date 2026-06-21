import { useTranslation } from 'react-i18next';
import TertiaryButton from '../buttons/tertiary/TertiaryButton';
import styles from './ErrorMessage.module.css';

type ErrorMessageProps = {
    title?: string;
    description?: string;
    onRetry?: () => void;
};

function ErrorMessage({ title, description, onRetry }: ErrorMessageProps) {
    const { t } = useTranslation('common');

    return (
        <div className={styles.container} role="alert">
            <p className={styles.title}>{title ?? t('error.title')}</p>
            <p className={styles.description}>{description ?? t('error.description')}</p>
            {onRetry && (
                <TertiaryButton
                    label={t('error.retry')}
                    onClick={onRetry}
                />
            )}
        </div>
    );
}

export default ErrorMessage;
