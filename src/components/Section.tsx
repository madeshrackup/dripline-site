import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  "aria-labelledby": ariaLabelledBy,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
}
