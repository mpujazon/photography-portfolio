import style from "./TertiaryButton.module.css";
import type {ButtonHTMLAttributes} from "react";

type TertiaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
}

function TertiaryButton({
    label,
    type = "button",
    ...props
}: TertiaryButtonProps) {
    return (
        <button
            type={type}
            className={ style.tertiaryButton }
            {...props}
        >
            { label }
            <span aria-hidden="true">→</span>
        </button>
    );
}

export default TertiaryButton;
