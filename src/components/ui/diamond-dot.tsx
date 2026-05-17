interface DiamondDotProps {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

export function DiamondDot({
  size = 4,
  color = "currentColor",
  className = "",
  animated = false,
}: DiamondDotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 0L4 2L2 4L0 2Z"
        fill={color}
        className={animated ? "animate-pulse" : ""}
      />
    </svg>
  );
}
