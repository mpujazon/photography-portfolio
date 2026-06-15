import style from "./PrimaryButton.module.css";
import type {ButtonHTMLAttributes} from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
}

export function PrimaryButton({
    label,
    type = "button",
    ...props
}: PrimaryButtonProps) {
    return (
        <button
            type={type}
            className={ style.primaryButton }
            {...props}
        >
            { label }
            <span aria-hidden="true">→</span>
        </button>
    );
}

export default PrimaryButton;