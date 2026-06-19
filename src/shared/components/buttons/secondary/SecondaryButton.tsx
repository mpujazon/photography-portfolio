import type { ButtonHTMLAttributes } from "react";
import Button from "../Button";
import style from "./SecondaryButton.module.css";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

const SecondaryButton = (props: SecondaryButtonProps) =>
    <Button {...props} className={style.secondaryButton} />;

export default SecondaryButton;
