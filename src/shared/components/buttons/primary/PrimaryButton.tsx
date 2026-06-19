import type { ButtonHTMLAttributes } from "react";
import Button from "../Button";
import style from "./PrimaryButton.module.css";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

const PrimaryButton = (props: PrimaryButtonProps) =>
    <Button {...props} className={style.primaryButton} withArrow />;

export default PrimaryButton;
