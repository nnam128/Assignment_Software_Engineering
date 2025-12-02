import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils"; // utils để merge class

const radioItemVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-gray-300 bg-white text-gray-800 hover:bg-gray-100",
        primary: "border-transparent bg-primary text-white hover:bg-primary/80",
        secondary: "border-transparent bg-secondary-500 text-white hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-white hover:bg-destructive/80",
      },
      size: {
        sm: "px-1 py-1 text-xs",
        md: "px-2 py-2 text-sm",
        lg: "px-3 py-3 text-base",
      },
      selected: {
        true: "ring-2 ring-offset-2 ring-primary",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      selected: false,
    },
  }
);

export interface RadioGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof radioItemVariants> {
  value: string;
  selected?: boolean;
}

export const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, variant, size, selected = false, value, children, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(radioItemVariants({ variant, size, selected }), className)}
        data-value={value}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup = ({
  value,
  onValueChange,
  children,
  className,
  ...props
}: RadioGroupProps) => {
  const handleClick = (val: string) => {
    if (onValueChange) onValueChange(val);
  };

  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement<RadioGroupItemProps>(child)) return child;
    const childValue = child.props.value;

    return React.cloneElement<RadioGroupItemProps>(child, {
      onClick: () => handleClick(childValue),
      selected: childValue === value,
    });
  });

  return (
    <div className={cn("inline-flex gap-2", className)} {...props}>
      {clonedChildren}
    </div>
  );
};