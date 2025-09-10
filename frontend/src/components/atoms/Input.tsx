export interface InputTProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variants?: "primary" | "outlined" | "underlined";
  type?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  classNames?: string;
}
const VARIANTS = {
  primary:
    "w-full ring-[var(--color-primary)] ring-2 text-xs rounded-md bg-[var(--color-border-dark)] text-black placeholder-white/70 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition",
  outlined:
    "w-full rounded-md border border-[var(--color-border-dark)] text-xs bg-transparent text-[var(--color-text)] placeholder-[var(--color-text)]/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition",
  underlined:
    "w-full border-b-2 border-[var(--color-border-black)] bg-transparent text-[var(--color-text)] placeholder-[var(--color-text)]/50 px-0 py-2 focus:outline-none focus:ring-0 focus:border-[var(--color-accent)] transition text-xs",
};

export default function Input({
  type = "text",
  placeholder = "",
  variants = "primary",
  label,
  error,
  classNames,
  ...rest
}: InputTProps) {
  const baseClassname = "flex justify-center items-center border ";

  const className = [baseClassname, VARIANTS[variants], classNames].join("");
  return (
    <div>
      {label && <label className="text-xs font-semibold">{label}</label>}
      <input
        aria-label={label}
        className={className}
        {...rest}
        type={type}
        placeholder={placeholder || ""}
      />
      <div className={`${type === "checkbox" ? "hidden" : "min-h-[10px]"} `}>
        <span className="text-[var(--color-error)] text-xs   ">
          {error || ""}
        </span>
      </div>
    </div>
  );
}
