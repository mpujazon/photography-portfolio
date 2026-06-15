import style from "./SecondaryButton.module.css";
import type {ButtonHTMLAttributes} from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
}

export function SecondaryButton({
    label,
    type = "button",
    ...props
}: SecondaryButtonProps) {
    return (
        <button
            type={type}
            className={ style.secondaryButton }
            {...props}
        >
            { label }
        </button>
    );
}

export default SecondaryButton;
