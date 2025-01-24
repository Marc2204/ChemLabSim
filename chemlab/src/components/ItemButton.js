import React, { useState, useEffect, useRef } from "react";

const ItemButton = ({ label }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const originalPositionRef = useRef(null); // Store original position as a reference

  // Function to toggle the movement
  const handleClick = (event) => {
    if (!isFollowing) {
      if (!originalPositionRef.current) {
        // Save the original position only once
        const rect = event.currentTarget.getBoundingClientRect();
        originalPositionRef.current = { top: rect.top, left: rect.left };
        setPosition(originalPositionRef.current);
      }
      setIsFollowing(true);
    } else {
      // Stop following and return to the original position
      setIsFollowing(false);
      setPosition(originalPositionRef.current);
    }
  };

  // Function to track the mouse movement
  const handleMouseMove = (event) => {
    if (isFollowing) {
      setPosition({ top: event.clientY - 25, left: event.clientX - 25 }); // Center the bottle around the mouse
    }
  };

  useEffect(() => {
    if (isFollowing) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFollowing]);

  return (
    <div
      className="bottle"
      style={{
        position: isFollowing ? "absolute" : "relative", // Always position absolute for movable elements
        top: position.top ,
        left: position.left ,
        cursor: isFollowing ? "grabbing" : "pointer",
        transition: !isFollowing ? "top 0.3s, left 0.3s" : "none", // Smooth transition when returning
      }}
      onClick={handleClick}
    >
      <div className="bottle-neck"></div>
      <div className="bottle-body">
        <span className="bottle-label">{label}</span>
      </div>
    </div>
  );
};

export default ItemButton;
