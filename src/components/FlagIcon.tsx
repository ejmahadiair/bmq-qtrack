import React from 'react';

const FlagWaving = ({ color = 'white', size = 64, rotationX = 0, rotationY = 0, rotation = 0 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className="transition-transform duration-500 ease-in-out hover:scale-110"
      style={{
        transform: `rotate(${rotation}deg) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
      }}
    >
      {/* Pole */}
      <rect x="10" y="5" width="4" height="54" rx="2" fill="#2D68A1" />
      
      {/* Waving Flag */}
      <path
        fill={color}
        d="M14,10 Q20,12 24,10 Q28,8 32,12 Q36,16 40,12 Q44,8 48,10 Q52,12 50,16 Q48,20 44,20 Q40,20 36,18 Q32,16 28,18 Q24,20 20,18 Q16,16 14,10 Z"
        transform="translate(0, -5)" 
      />
    </svg>
  );
};

export default FlagWaving;
