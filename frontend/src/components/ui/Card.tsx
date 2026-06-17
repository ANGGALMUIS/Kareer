import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
      "
    >
      {children}
    </div>
  );
}
