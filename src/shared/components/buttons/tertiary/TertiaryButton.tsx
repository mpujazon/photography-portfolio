import type { ButtonHTMLAttributes } from "react";
import Button from "../Button";
import style from "./TertiaryButton.module.css";

type TertiaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

const TertiaryButton = (props: TertiaryButtonProps) =>
    <Button {...props} className={style.tertiaryButton} withArrow />;

export default TertiaryButton;
