import FeaturedAlbum from "../components/FeaturedAlbum/FeaturedAlbum.tsx";
import {Hero} from "../components/Hero/Hero.tsx";
import BehindTheLens from "../components/BehindTheLens/BehindTheLens.tsx";
import { usePhotos } from "../hooks/usePhotos";

export function Homepage() {
    const photos = usePhotos();
    return (
        <>
            <Hero photos={photos}/>
            <FeaturedAlbum photos={photos}/>
            <BehindTheLens />
        </>
    );
};
