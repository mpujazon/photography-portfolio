import type { ButtonHTMLAttributes } from "react";

type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    withArrow?: boolean;
};

function Button({ label, type = "button", withArrow = false, className, ...props }: ButtonBaseProps) {
    return (
        <button type={type} className={className} {...props}>
            {label}
            {withArrow && <span aria-hidden="true">→</span>}
        </button>
    );
}

export default Button;
