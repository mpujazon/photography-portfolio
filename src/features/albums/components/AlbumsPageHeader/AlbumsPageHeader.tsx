import { Trans, useTranslation } from "react-i18next";
import style from "./AlbumsPageHeader.module.css";

function AlbumsPageHeader() {
    const { t } = useTranslation("albums");
    return (
        <header className={style.header}>
            <span className={style.subtitle}>{t("header.subtitle")}</span>
            <h1 className={style.title}>
                <Trans
                    i18nKey={"header.title"}
                    ns={"albums"}
                    components={[<span className={style.yellow}/>]}
                />
            </h1>
            <p className={style.paragraph}>{t("header.paragraph")}</p>
        </header>
    );
}

export default AlbumsPageHeader;