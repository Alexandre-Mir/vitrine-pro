import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon" | "outline";
type ButtonSize = "default" | "sm" | "lg" | "icon" | "none";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-accent hover:bg-[#f9e3ae] text-black uppercase tracking-widest rounded-lg font-medium",
    secondary: "bg-secondary text-primary hover:bg-secondary/80 rounded-lg",
    ghost: "bg-transparent text-primary",
    icon: "bg-accent hover:bg-yellow-400 text-background rounded-full shadow-sm",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary/5",
  };

  const sizes: Record<ButtonSize, string> = {
    default: "py-3 px-8 text-xs",
    sm: "py-2 px-4 text-xs",
    lg: "py-4 px-10 text-sm",
    icon: "p-2.5",
    none: "p-0",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
