import style from './Hero.module.css';

export function Hero() {
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
                </div>
            </section>


        </div>
    );
}
