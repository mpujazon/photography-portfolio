import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enAlbums from "./locales/en/albums.json";
import enAbout from "./locales/en/about.json";
import enContact from "./locales/en/contact.json";
import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esAlbums from "./locales/es/albums.json";
import esAbout from "./locales/es/about.json";
import esContact from "./locales/es/contact.json";

const browserLanguage = typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("es") ? "es" : "en";

i18n
    .use(initReactI18next)
    .init({
        lng: browserLanguage,
        fallbackLng: "en",
        supportedLngs: ["en", "es"],
        defaultNS: "common",
        resources: {
            en: {
                common: enCommon,
                home: enHome,
                albums: enAlbums,
                about: enAbout,
                contact: enContact,
            },
            es: {
                common: esCommon,
                home: esHome,
                albums: esAlbums,
                about: esAbout,
                contact: esContact,
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
