import * as React from "react";

import { cn } from "@/lib/utils";

type IconProps = React.SVGProps<SVGSVGElement>;

export function Squiggle({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M2 10 Q 12 0, 22 10 T 42 10 T 62 10 T 82 10 T 98 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Sparkle({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowCurl({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M5 20 Q 15 5, 30 8 T 50 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M44 14 L 50 20 L 44 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function DotCluster({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <circle cx="30" cy="20" r="1.5" fill="currentColor" />
      <circle cx="50" cy="15" r="2" fill="currentColor" />
      <circle cx="20" cy="35" r="1.5" fill="currentColor" />
      <circle cx="40" cy="40" r="2" fill="currentColor" />
      <circle cx="55" cy="50" r="1.5" fill="currentColor" />
      <circle cx="10" cy="50" r="2" fill="currentColor" />
    </svg>
  );
}

export function CircleScribble({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M 50 10 Q 90 12, 90 50 Q 88 90, 50 90 Q 10 88, 10 50 Q 12 10, 50 10 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UnderlineMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M 4 8 Q 50 2, 100 6 T 196 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function StarBurst({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M20 2 L22 18 L38 20 L22 22 L20 38 L18 22 L2 20 L18 18 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlantDoodle({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M30 75 Q 30 50, 30 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 50 Q 15 45, 8 30 Q 20 35, 30 45"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M30 40 Q 45 35, 52 20 Q 40 25, 30 35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <path
        d="M30 30 Q 30 20, 32 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function HeartDoodle({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M16 28 C 8 22, 2 16, 4 9 C 6 3, 13 4, 16 9 C 19 4, 26 3, 28 9 C 30 16, 24 22, 16 28 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
