import style from './HeroTextContent.module.css';
import PrimaryButton from "../../../../shared/components/buttons/primary/PrimaryButton.tsx";
import SecondaryButton from "../../../../shared/components/buttons/secondary/SecondaryButton.tsx";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';

export function HeroTextContent() {
    const navigate = useNavigate();
    const { t } = useTranslation('home');

    return (
        <div className={style.heroFirstColumn}>
            <p
                className={style.heroEyebrow}
                aria-label={t('hero.eyebrowAria')}
            >
                {t('hero.eyebrow')}
            </p>
            <h1
                id="hero-title"
                className={style.heroBrandName}
            >
                <span>LENS</span>
                <span className={style.heroBrandNameYellow}>BY</span>
                <span>MIKE</span>
            </h1>
            <p className={style.heroSubtitle}>
                <span aria-hidden={true} className={style.yellow}>··</span>
                {t('hero.subtitle')}
            </p>
            <p className={style.heroParagraph}>
                {t('hero.paragraph')}
            </p>
            <div className={style.ctaContainer}>
                <PrimaryButton label={t('hero.ctaPrimary')} onClick={() => navigate("/albums")}/>
                <SecondaryButton label={t('hero.ctaSecondary')} onClick={() => navigate("/contact")}/>
            </div>
        </div>
    );
}
