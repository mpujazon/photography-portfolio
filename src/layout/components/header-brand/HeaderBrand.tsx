import { Link } from "react-router";
import styles from "./HeaderBrand.module.css";

type HeaderBrandProps = {
    brandName: string;
}

const HeaderBrand = ({ brandName }: HeaderBrandProps) => (
    <Link className={styles.brandContainer} to='/'>
        <div className={styles.brandBox}></div>
        <h1 className={styles.brandName}>{brandName}</h1>
    </Link>
);

export default HeaderBrand;
