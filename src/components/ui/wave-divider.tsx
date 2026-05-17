interface WaveDividerProps {
  className?: string;
  color?: string;
}

export function WaveDivider({ className = "", color = "var(--ivory-300)" }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20C120 5 240 35 360 20C480 5 600 35 720 20C840 5 960 35 1080 20C1200 5 1320 35 1440 20V40H0V20Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M0 25C180 12 360 38 540 25C720 12 900 38 1080 25C1260 12 1380 38 1440 25V40H0V25Z"
          stroke={color}
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}
