import style from './Hero.module.css';
import Carousel from "../Carousel/Carousel.tsx";
import type { PhotoDto } from '../../../../shared/models/Photo.ts';
import { HeroTextContent } from "../HeroTextContent/HeroTextContent.tsx";

type HeroProps = {
    photos: PhotoDto[]
}

export function Hero(heroProps: HeroProps) {

    return (
        <section className={style.heroSection}>
            <div className={style.heroShell}>
                <section
                    className={style.hero}
                    aria-labelledby="hero-title"
                >
                    <HeroTextContent />
                    <div className={style.heroSecondColumn}>
                        <Carousel photos={heroProps.photos}/>
                    </div>
                </section>
            </div>
        </section>
    );
}
