/**
 * Typography Components - OpenCarBox & Carvantooo
 *
 * Typisierte Text-Komponenten basierend auf dem Design System.
 * Fluid Typography mit responsive Scaling.
 *
 * @module components/ui/typography
 */

import { cn } from '@/lib/utils';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Heading Variants
 */
const headingVariants = cva('font-display font-bold tracking-tight', {
  variants: {
    size: {
      hero: 'text-5xl md:text-6xl lg:text-7xl',      // Hero Text (56-96px)
      h1: 'text-4xl md:text-5xl',                    // 36-48px
      h2: 'text-3xl md:text-4xl',                    // 30-40px
      h3: 'text-2xl md:text-3xl',                    // 24-32px
      h4: 'text-xl md:text-2xl',                     // 20-24px
      h5: 'text-lg md:text-xl',                      // 18-20px
      h6: 'text-base md:text-lg',                    // 16-18px
    },
    variant: {
      default: 'text-slate-900 dark:text-slate-100',
      muted: 'text-slate-600 dark:text-slate-400',
      carvantooo: 'text-carvantooo-500',
      opencarbox: 'text-opencarbox-500',
      gradient: 'bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent',
      'gradient-red': 'bg-gradient-to-r from-carvantooo-500 to-carvantooo-700 bg-clip-text text-transparent',
      'gradient-blue': 'bg-gradient-to-r from-opencarbox-500 to-opencarbox-900 bg-clip-text text-transparent',
    },
  },
  defaultVariants: {
    size: 'h1',
    variant: 'default',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Heading Component
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, variant, as: Component = 'h1', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';

/**
 * Text Variants
 */
const textVariants = cva('font-body', {
  variants: {
    size: {
      xs: 'text-xs',      // 12-14px
      sm: 'text-sm',      // 14-16px
      base: 'text-base',  // 16-18px
      lg: 'text-lg',      // 18-20px
      xl: 'text-xl',      // 20-24px
    },
    variant: {
      default: 'text-slate-700 dark:text-slate-300',
      muted: 'text-slate-500 dark:text-slate-400',
      subtle: 'text-slate-600 dark:text-slate-400',
      carvantooo: 'text-carvantooo-600',
      opencarbox: 'text-opencarbox-600',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'base',
    variant: 'default',
    weight: 'normal',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'label';
}

/**
 * Text Component
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, variant, weight, as: Component = 'p', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, variant, weight }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

/**
 * Lead Text (Intro Paragraph)
 */
export const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed',
      className
    )}
    {...props}
  />
));
Lead.displayName = 'Lead';

/**
 * Small Text
 */
export const Small = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <small
    ref={ref}
    className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
));
Small.displayName = 'Small';

/**
 * Muted Text
 */
export const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
));
Muted.displayName = 'Muted';

/**
 * Code Text
 */
export const Code = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      'relative rounded bg-slate-100 dark:bg-slate-800 px-[0.3rem] py-[0.2rem] font-mono text-sm',
      className
    )}
    {...props}
  />
));
Code.displayName = 'Code';

/**
 * Blockquote
 */
export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      'mt-6 border-l-4 border-slate-300 dark:border-slate-700 pl-6 italic text-slate-600 dark:text-slate-400',
      className
    )}
    {...props}
  />
));
Blockquote.displayName = 'Blockquote';

/**
 * List
 */
export const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
    {...props}
  />
));
List.displayName = 'List';

/**
 * Inline Code
 */
export const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      'relative rounded bg-slate-100 dark:bg-slate-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      className
    )}
    {...props}
  />
));
InlineCode.displayName = 'InlineCode';
