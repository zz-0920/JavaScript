import React, { useState } from 'react';
import './index.css';

function MyButton() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className={`my-button ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      鼠标悬停查看效果
    </button>
  );
}

export default MyButton;
