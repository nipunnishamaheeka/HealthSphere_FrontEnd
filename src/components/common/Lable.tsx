import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof labelVariants> {
    optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className = "", optional, children, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={labelVariants({ className })}
                {...props}
            >
                {children}
                {optional && (
                    <span className="text-sm text-gray-500 ml-1">(optional)</span>
                )}
            </label>
        )
    }
)

Label.displayName = "Label"

export { Label, labelVariants }