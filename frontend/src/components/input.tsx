import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="rounded-lg w-full py-2 px-3 outline-none font-semibold bg-[#09090b] border border-[#27272a] placeholder-[#ffffff]/40"
    />
  );
}
