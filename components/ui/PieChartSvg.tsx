export default function PieChartSvg({ percentage, className = "" }: { percentage: number, className?: string }) {
  // SVG coordinates for drawing the pie slice
  const radius = 80;
  const cx = 100;
  const cy = 100;
  
  // Calculate arc
  const angle = (percentage / 100) * 360;
  // Convert angle to radians and calculate end point
  const rad = (angle - 90) * (Math.PI / 180);
  const x = cx + radius * Math.cos(rad);
  const y = cy + radius * Math.sin(rad);
  
  const largeArcFlag = angle > 180 ? 1 : 0;
  
  // If percentage is 100, we can't use an arc, just use a circle
  const isFull = percentage >= 100;
  const isEmpty = percentage <= 0;

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="pie-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.1" />
        </filter>
      </defs>

      <g transform="translate(0, 0)" filter="url(#pie-shadow)">
        {/* Background Circle (Incorrect/Unattempted) */}
        <circle cx={cx} cy={cy} r={radius} fill="#FEF2F2" stroke="#FEE2E2" strokeWidth="1" />
        
        {/* Foreground Slice (Correct) */}
        {!isEmpty && !isFull && (
          <path
            d={`M ${cx} ${cy} L ${cx} ${cy - radius} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y} Z`}
            fill="#107A53"
          />
        )}
        
        {isFull && (
          <circle cx={cx} cy={cy} r={radius} fill="#107A53" />
        )}
        
        {/* Inner Donut Hole */}
        <circle cx={cx} cy={cy} r={radius - 25} fill="#ffffff" />
        
        {/* Percentage Text */}
        <text
          x={cx}
          y={cy + 10}
          fontFamily="system-ui, sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="#1C1917"
          textAnchor="middle"
        >
          {Math.round(percentage)}%
        </text>
      </g>
    </svg>
  );
}
