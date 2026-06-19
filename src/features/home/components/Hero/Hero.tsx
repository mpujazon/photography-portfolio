import style from './Hero.module.css';
import Carousel from "../Carousel/Carousel.tsx";
import type { PictureDto } from '../../../../shared/models/Picture.ts';
import { HeroTextContent } from "../HeroTextContent/HeroTextContent.tsx";

type HeroProps = {
    pictures: PictureDto[]
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
                        <Carousel pictures={heroProps.pictures}/>
                    </div>
                </section>
            </div>
        </section>
    );
}
