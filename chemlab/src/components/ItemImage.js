import React, { useState, useEffect, useRef } from "react";
import '../componentDesign/ItemImage.css';

const ItemImage = ({ src, alt, id, isTrash, onItemClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const originalPositionRef = useRef(null);

  // para sa mouse down event para magstart dragging
  const handleMouseDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    originalPositionRef.current = { top: rect.top, left: rect.left };
    setIsDragging(true);
  };

  // para sa mouse up event para magstop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ top: 0, left: 0 });  // Reset position on drop
  };

  // para sa mouse move event para magdrag yung image
  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        top: event.clientY - 25,
        left: event.clientX - 25, 
      });
    }
  };

  // Update event listeners para sa mouse move at mouse up
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

  // para sa item click para magupdate yung iniinput sa field with the item name
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(alt);
    }
  };

  // Return the trash button or image based sa `isTrash` prop
  return isTrash ? (
    <button
      id={id}
      onMouseDown={handleMouseDown}
      onClick={handleItemClick} 
      className="trash-button"
      style={{ backgroundImage: `url(${src})` }} 
    ></button>
  ) : (
    <img
      src={src}
      alt={alt}
      id={id}
      onMouseDown={handleMouseDown}
      onClick={handleItemClick} 
      className={`item-image ${isDragging ? "dragging" : ""}`}
      style={{
        top: position.top,
        left: position.left,  
      }}
    />
  );
};

export default ItemImage;
