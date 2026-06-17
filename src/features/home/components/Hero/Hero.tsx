import style from './Hero.module.css';
import PrimaryButton from "../../../../shared/components/buttons/primary/PrimaryButton.tsx";
import {useNavigate} from "react-router";
import SecondaryButton from "../../../../shared/components/buttons/secondary/SecondaryButton.tsx";
import Carousel from "../Carousel/Carousel.tsx";
import { useTranslation } from 'react-i18next';

const MOCK_PICTURES = [
    {
        id: 5,
        url: "https://res.cloudinary.com/urbancore/image/upload/v1778750333/wwmd21mnx029mblyzqac.jpg",
        title: "Aston Martin Vantage ELMS 2026",
        category: "Motor"
    },
    {
        id: 6,
        url: "https://res.cloudinary.com/urbancore/image/upload/v1778750327/jbnhgpscoknssr7pzze4.jpg",
        title: "ELMS 2026",
        category: "Motor"
    },
    {
        id: 7,
        url: "https://res.cloudinary.com/urbancore/image/upload/v1778750322/e6ney7qsj0gixcqaz1hl.jpg",
        title: "ELMS 2026",
        category: "Motor"
    },
    {
        id: 8,
        url: "https://res.cloudinary.com/urbancore/image/upload/v1778750319/cbmfyqmlycujwibtwhqd.jpg",
        title: "ELMS 2026",
        category: "Motor"
    },
];

export function Hero() {
    const navigate = useNavigate();
    const { t } = useTranslation('home');

    return (
        <section className={style.heroSection}>
        <div className={style.heroShell}>
            <section
                className={style.hero}
                aria-labelledby="hero-title"
            >
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
                <div className={style.heroSecondColumn}>
                    <Carousel pictures={MOCK_PICTURES}/>
                </div>
            </section>
        </div>
        </section>
    );
}
