import FeaturedAlbum from "../components/FeaturedAlbum/FeaturedAlbum.tsx";
import { Hero } from "../components/Hero/Hero.tsx";
import BehindTheLens from "../components/BehindTheLens/BehindTheLens.tsx";

export function Homepage() {
    return (
        <>
            <Hero />
            <FeaturedAlbum />
            <BehindTheLens />
        </>
    );
};
