import type { Picture } from "../../../shared/models/Picture.ts";
import FeaturedWork from "../components/FeaturedWork/FeaturedWork.tsx";
import {Hero} from "../components/Hero/Hero.tsx";

export function Homepage() {
    const MOCK_PICTURES: Picture[] = [
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
    return (
        <>
            <Hero pictures={MOCK_PICTURES}/>
            <FeaturedWork/>
        </>
    );
};