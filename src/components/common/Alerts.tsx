import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
                success:
                    "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-600",
                info:
                    "border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-600",
                warning:
                    "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const iconMap = {
    default: Info,
    destructive: XCircle,
    success: CheckCircle2,
    info: Info,
    warning: AlertCircle,
}

interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {
    icon?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className = "", variant = "default", icon = true, children, ...props }, ref) => {
        const Icon = iconMap[variant || "default"]

        return (
            <div
                ref={ref}
                role="alert"
                className={alertVariants({ variant, className })}
                {...props}
            >
                {icon && <Icon className="h-4 w-4" />}
                {children}
            </div>
        )
    }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
    <h5
        ref={ref}
        className={`mb-1 font-medium leading-none tracking-tight ${className}`}
        {...props}
    />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
    <div
        ref={ref}
        className={`text-sm [&_p]:leading-relaxed ${className}`}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }