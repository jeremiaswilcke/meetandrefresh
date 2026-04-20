interface MaterialIconProps {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
}

export function MaterialIcon({ name, size = 24, filled = false, className = "" }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "filled" : ""} ${className}`}
      style={{ fontSize: `${size}px`, width: `${size}px`, height: `${size}px`, lineHeight: 1 }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
