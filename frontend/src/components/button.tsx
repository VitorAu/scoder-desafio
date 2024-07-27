import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "rounded-lg p-2 font-semibold flex justify-center items-center gap-2",

  variants: {
    variant: {
      primary: "bg-[#7045ff] hover:bg-[#3f2594]",
      secondary: "border border-[#7045ff]",
    },

    size: {
      default: "w-48",
      adaptable: "px-5 py-3",
      full: "w-full h-11",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
}
