import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { connectionColours } from '@/theme/colors';

const tagVariants = cva(
	'inline-flex items-center justify-center rounded-full text-xs font-medium ring-offset-white transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
	{
		variants: {
			variant: {
				default:
					'bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
				destructive:
					'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
				outline:
					'border border-slate-200 bg-white hover:opacity-80 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
				secondary:
					'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
				ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
				link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
				// ...Object.entries(connectionColours).reduce(
				// 	(acc: Record<string, string>, [key, color]) => {
				// 		acc[
				// 			key
				// 		] = `border [bg-${color}] hover:opacity-90 hover:text-slate-900 dark:border-${color} dark:bg-${color} dark:hover:bg-${color} dark:hover:text-slate-50`;
				// 		return acc;
				// 	},
				// 	{}
				// ),
			},
			size: {
				default: 'px-2 py-2',
				sm: 'h-9 rounded-full px-2',
				lg: 'h-11 rounded-full px-6',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface TagProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof tagVariants> {
	asChild?: boolean;
}

const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(tagVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Tag.displayName = 'Tag';

export { Tag, tagVariants };
