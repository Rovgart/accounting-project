export interface ButtonPropsI
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "button";
  variant?: "primary" | "outlined" | "underlined";
  leftIcon?: string;
  rightIcon?: string;
  text: string;
  onClick?: () => void;
  className?: string;
}
const VARIANTS = {
  primary:
    "rounded-md bg-[var(--color-primary)] text-white px-4 py-2 shadow-md hover:bg-[var(--color-accent)] transition cursor-pointer",
  outlined:
    "rounded-md border-2 border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white transition cursor-pointer",
  underlined:
    "border-b-2 border-transparent hover:border-[var(--color-accent)] bg-transparent text-[var(--color-primary)] px-0 py-2 transition cursor-pointer",
};
export default function Button({
  type = "submit",
  leftIcon,
  rightIcon,
  text,
  variant = "primary",
  onClick,
  className,
  ...rest
}: ButtonPropsI) {
  const baseClass =
    "flex justify-items items-center rounded-md px-1 py-2 cursor-pointer ";

  const classes = [baseClass, VARIANTS[variant], className].join("");
  return (
    <div className="flex items-center justify-center cursor-pointer  ">
      {leftIcon || ""}
      <button type={type} className={classes} onClick={onClick} {...rest}>
        {text}
      </button>
      {rightIcon || ""}
    </div>
  );
}
