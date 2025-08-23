import React from 'react';

const ConnectingLine = ({ direction = 'right' }) => {
  // The 'd' attribute defines the path:
  // M = Move To (start point)
  // V = Vertical Line To
  // Q = Quadratic Bezier Curve (for smooth curves)
  // H = Horizontal Line To
  const pathData = "M 1 0 V 100 Q 1 120 20 120 H 180 Q 200 120 200 140 V 240";

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 201 240" // The coordinate system for our path
      preserveAspectRatio="none"
      className={`absolute ${direction === 'left' ? 'transform scale-x-[-1]' : ''}`}
    >
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 5" // This creates the dashed effect
      />
    </svg>
  );
};

export default ConnectingLine;