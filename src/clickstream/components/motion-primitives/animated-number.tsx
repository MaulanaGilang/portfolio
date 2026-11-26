'use client';
import { cn } from '@/clickstream/lib/utils';
import { motion, SpringOptions, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  format?: (n: number) => string;
};

const defaultFormat = (n: number) => Math.round(n).toLocaleString('en-US');

// Adapted from motion-primitives: the motion element is static (not recreated
// per render) and the display format is configurable.
export function AnimatedNumber({
  value,
  className,
  springOptions,
  format = defaultFormat,
}: AnimatedNumberProps) {
  const spring = useSpring(0, springOptions);
  const display = useTransform(spring, (current) => format(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={cn('tabular-nums', className)}>{display}</motion.span>;
}
