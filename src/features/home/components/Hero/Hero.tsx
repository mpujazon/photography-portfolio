import style from './Hero.module.css';
import Carousel from "../Carousel/Carousel.tsx";
import { HeroTextContent } from "../HeroTextContent/HeroTextContent.tsx";

export function Hero() {
    return (
        <section className={style.heroSection}>
            <div className={style.heroShell}>
                <section
                    className={style.hero}
                    aria-labelledby="hero-title"
                >
                    <HeroTextContent />
                    <div className={style.heroSecondColumn}>
                        <Carousel />
                    </div>
                </section>
            </div>
        </section>
    );
}
