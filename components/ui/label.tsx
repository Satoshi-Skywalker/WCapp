"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"


import { cn } from "@/lib/utils"

// I'll just use a simple implementation without cva for now to match Button, 
// or actually I should probably just install cva since I'm using it here in the import.
// Wait, I didn't install cva. I should install it or remove the import.
// I'll remove the import and just use cn.

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
