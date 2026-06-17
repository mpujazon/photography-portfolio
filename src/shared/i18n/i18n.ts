import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";

i18n
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        defaultNS: "common",
        resources: {
            en: {
                common: enCommon,
                home: enHome,
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;