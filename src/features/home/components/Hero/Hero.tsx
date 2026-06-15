import style from './Hero.module.css';
import PrimaryButton from "../../../../shared/components/buttons/primary/PrimaryButton.tsx";
import { useNavigate } from "react-router";
import SecondaryButton from "../../../../shared/components/buttons/secondary/SecondaryButton.tsx";
import Carousel from "../Carousel/Carousel.tsx";
import { useHeroPhotos, useSiteConfig } from "../../hooks/useHeroData.ts";

function configValue(entries: { key: string; value: string }[], key: string, fallback: string): string {
    return entries.find(e => e.key === key)?.value ?? fallback;
}

export function Hero() {
    const navigate = useNavigate();
    const { data: photos = [] } = useHeroPhotos();
    const { data: config = [] } = useSiteConfig();

    const pictures = photos.map(p => ({
        id: p.id,
        url: p.imageUrl,
        title: p.title,
        category: p.category ?? '',
    }));

    const brandLine1 = configValue(config, 'brandLine1', 'LENS');
    const brandBy    = configValue(config, 'brandBy', 'BY');
    const brandLine2 = configValue(config, 'brandLine2', 'MIKE');
    const heroLabel  = configValue(config, 'heroLabel', 'Street & Sports Photographer / Barcelona, ES');
    const heroSubtitle  = configValue(config, 'heroSubtitle', 'Photographs by Miguel Pujazón Cárdenas');
    const heroParagraph = configValue(config, 'heroParagraph', 'I shoot motion and the street — the heat off a MotoGP straight, the lean of a classic bike at Montjuïc, the half-second a city gives you on a corner. No staging, no retouching beyond the grade. Just the frame I caught.');

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
                        aria-label="Street and sports photographer based in Barcelona, Spain"
                    >
                        {heroLabel}
                    </p>
                    <h1
                        id="hero-title"
                        className={style.heroBrandName}
                    >
                        <span>{brandLine1}</span>
                        <span className={style.heroBrandNameYellow}>{brandBy}</span>
                        <span>{brandLine2}</span>
                    </h1>
                    <p className={style.heroSubtitle}>
                        <span aria-hidden={true} className={style.yellow}>··</span>
                        {" "}{heroSubtitle}
                    </p>
                    <p className={style.heroParagraph}>
                        {heroParagraph}
                    </p>
                    <div className={style.ctaContainer}>
                        <PrimaryButton label="VIEW ALBUMS" onClick={() => navigate("/albums")}/>
                        <SecondaryButton label="GET IN TOUCH" onClick={() => navigate("/contact")}/>
                    </div>
                </div>
                <div className={style.heroSecondColumn}>
                    <Carousel pictures={pictures}/>
                </div>
            </section>
        </div>
        </section>
    );
}
