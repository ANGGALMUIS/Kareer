import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary: "bg-gray-900 text-white hover:bg-black",

    outline: "border border-gray-300 bg-white hover:bg-gray-50",
  };

  return (
    <button
      className={`rounded-lg px-5 py-3 font-medium transition ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
