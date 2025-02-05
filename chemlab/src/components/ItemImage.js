import React, { useState, useEffect, useRef } from "react";
import '../componentDesign/ItemImage.css';  // Import the CSS file

const ItemImage = ({ src, alt, id, isTrash, onItemClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });  // Start position at left: 0
  const originalPositionRef = useRef(null);

  // Handle mouse down event to start dragging
  const handleMouseDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    originalPositionRef.current = { top: rect.top, left: rect.left };
    setIsDragging(true);
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ top: 0, left: 0 });  // Reset position on drop (optional)
  };

  // Handle mouse move event to drag the image
  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        top: event.clientY - 25,
        left: event.clientX - 25,  // This ensures it moves horizontally as well
      });
    }
  };

  // Update event listeners for mouse move and mouse up
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Handle item click to update the input field with the item name
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(alt); // Update input field with item name (alt)
    }
  };

  // Return the trash button or image based on `isTrash` prop
  return isTrash ? (
    <button
      id={id}
      onMouseDown={handleMouseDown}
      onClick={handleItemClick} // Trigger input field update when clicked
      className="trash-button"
      style={{ backgroundImage: `url(${src})` }}  // Inline style for background
    ></button>
  ) : (
    <img
      src={src}
      alt={alt}
      id={id}
      onMouseDown={handleMouseDown}
      onClick={handleItemClick} // Trigger input field update when clicked
      className={`item-image ${isDragging ? "dragging" : ""}`}
      style={{
        top: position.top,
        left: position.left,  // The item will start at the left side
      }}
    />
  );
};

export default ItemImage;
