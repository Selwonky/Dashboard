import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      inputSize: {
        xs: "h-7 px-2 py-0.5 text-xs file:h-5 file:text-xs",
        sm: "h-8 px-2.5 py-1 text-sm file:h-6 file:text-sm",
        default: "h-9 px-3 py-1 text-base md:text-sm file:h-7 file:text-sm",
        lg: "h-10 px-3.5 py-1.5 text-base file:h-8 file:text-base",
        xl: "h-12 px-4 py-2 text-lg file:h-9 file:text-lg",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
)

function Input({
  className,
  type,
  inputSize,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={inputSize}
      className={cn(inputVariants({ inputSize, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
