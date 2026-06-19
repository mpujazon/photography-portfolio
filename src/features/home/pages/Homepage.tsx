import FeaturedAlbum from "../components/FeaturedAlbum/FeaturedAlbum.tsx";
import {Hero} from "../components/Hero/Hero.tsx";
import BehindTheLens from "../components/BehindTheLens/BehindTheLens.tsx";
import { usePictures } from "../hooks/usePictures";

export function Homepage() {
    const pictures = usePictures();
    return (
        <>
            <Hero pictures={pictures}/>
            <FeaturedAlbum pictures={pictures}/>
            <BehindTheLens />
        </>
    );
};
