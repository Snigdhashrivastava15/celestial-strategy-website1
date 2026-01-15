interface SwastikIconProps {
  className?: string;
  size?: number;
}

const SwastikIcon = ({ className = "", size = 24 }: SwastikIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#593AA1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Vertical line */}
      <line x1="12" y1="4" x2="12" y2="20" />
      {/* Horizontal line */}
      <line x1="4" y1="12" x2="20" y2="12" />
      {/* Top arm - goes right */}
      <line x1="12" y1="4" x2="17" y2="4" />
      {/* Right arm - goes down */}
      <line x1="20" y1="12" x2="20" y2="17" />
      {/* Bottom arm - goes left */}
      <line x1="12" y1="20" x2="7" y2="20" />
      {/* Left arm - goes up */}
      <line x1="4" y1="12" x2="4" y2="7" />
    </svg>
  );
};

export default SwastikIcon;
