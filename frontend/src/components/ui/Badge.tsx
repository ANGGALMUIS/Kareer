interface Props {
  children: React.ReactNode;

  variant?: "success" | "warning" | "danger" | "info";
}

export default function Badge({ children, variant = "info" }: Props) {
  const styles = {
    success: "bg-green-100 text-green-700",

    warning: "bg-yellow-100 text-yellow-700",

    danger: "bg-red-100 text-red-700",

    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
