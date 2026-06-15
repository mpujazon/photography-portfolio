import style from './Hero.module.css';
import PrimaryButton from "../../../../shared/components/buttons/primary/PrimaryButton.tsx";
import {useNavigate} from "react-router";
import SecondaryButton from "../../../../shared/components/buttons/secondary/SecondaryButton.tsx";

export function Hero() {
    const navigate = useNavigate();
    const currentPicture= 0;
    const totalPictures = 7;

    return (
        <div className={style.heroShell}>
            <header className={style.heroInfo}>
                <p aria-label="Street and sports photographer based in Barcelona, Spain">
                    Street & Sports Photographer <span aria-hidden="true">/</span> Barcelona, ES
                </p>
                <div
                    className={style.currentFrameContainer}
                    aria-label={`Frame ${currentPicture} of ${totalPictures}`}
                >
                    <div className={style.decorativeSquare} aria-hidden="true"/>
                    <p aria-hidden="true">
                        FRAME <span>00{currentPicture}</span> / 00{totalPictures}
                    </p>
                </div>
            </header>
            <section
                className={style.hero}
                aria-labelledby="hero-title"
            >
                <div className={style.heroFirstColumn}>
                    <h1
                        id="hero-title"
                        className={style.heroBrandName}
                    >
                        <span>LENS</span>
                        <span className={style.heroBrandNameYellow}>BY</span>
                        <span>MIKE</span>
                    </h1>
                    <p className={style.heroSubtitle}>
                        <span aria-hidden={ true } className={style.yellow}>
                            ··
                        </span>
                        Photographs by Miguel Pujazón Cárdenas
                    </p>
                    <p className={style.heroParagraph}>
                        I shoot motion and the street — the heat off a MotoGP
                        straight, the lean of a classic bike at Montjuïc, the half-
                        second a city gives you on a corner. No staging, no
                        retouching beyond the grade. Just the frame I caught.
                    </p>
                    <div className={style.ctaContainer}>
                        <PrimaryButton label={ "VIEW ALBUMS" } onClick={()=> navigate("/albums") } />
                        <SecondaryButton label={ "GET IN TOUCH" } onClick={() => navigate("/contact")} />
                    </div>

                </div>
            </section>


        </div>
    );
}
