import { Link } from "react-router";
import styles from "./HeaderBrand.module.css";

type HeaderBrandProps = {
    brandName: string;
}

const HeaderBrand = ({ brandName }: HeaderBrandProps) => (
    <Link
        className={styles.brandContainer}
        to='/'
        aria-label={`${brandName} home`}
    >
        <div className={styles.brandBox} aria-hidden="true"/>
        <span className={styles.brandName}>{brandName}</span>
    </Link>
);

export default HeaderBrand;
