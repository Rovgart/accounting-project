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
    "w-full ring-[var(--color-primary)] ring-2 rounded-md bg-[var(--color-text)] text-black placeholder-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition",
  outlined:
    "w-full rounded-md border border-[var(--color-primary)] bg-transparent text-[var(--color-text)] placeholder-[var(--color-text)]/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition",
  underlined:
    "w-full border-b-2 border-[var(--color-primary)] bg-transparent text-[var(--color-text)] placeholder-[var(--color-text)]/50 px-0 py-2 focus:outline-none focus:ring-0 focus:border-[var(--color-accent)] transition",
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
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <input
        aria-label={label}
        className={className}
        {...rest}
        type={type}
        placeholder={placeholder || ""}
      />
      {error && <span className="text-[var(--color-error)]">{error}</span>}
    </div>
  );
}
