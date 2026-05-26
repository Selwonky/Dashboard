"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "bg-primary/20 relative w-full overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        default: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  showLabel?: boolean
  labelPosition?: "inside" | "outside"
}

function Progress({
  className,
  value,
  size,
  showLabel = false,
  labelPosition = "outside",
  ...props
}: ProgressProps) {
  const percentage = value || 0

  if (showLabel && labelPosition === "outside") {
    return (
      <div className="flex items-center gap-2 w-full">
        <ProgressPrimitive.Root
          data-slot="progress"
          data-size={size}
          className={cn(progressVariants({ size }), "flex-1", className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className="bg-primary h-full w-full flex-1 transition-all"
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </ProgressPrimitive.Root>
        <span className="text-sm font-medium text-muted-foreground min-w-[3ch] text-right">
          {Math.round(percentage)}%
        </span>
      </div>
    )
  }

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-size={size}
      className={cn(progressVariants({ size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "bg-primary h-full w-full flex-1 transition-all relative",
          showLabel && labelPosition === "inside" && "flex items-center justify-end"
        )}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      >
        {showLabel && labelPosition === "inside" && (size === "lg" || size === "xl") && (
          <span className="text-xs font-medium text-primary-foreground px-1.5">
            {Math.round(percentage)}%
          </span>
        )}
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
}

export { Progress, progressVariants }
