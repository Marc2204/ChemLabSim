import React, { useState } from "react";
import ItemImage from './ItemImage.js';
import chemYellow from '../imageButton/chemYellow.png';
import chemGreen from '../imageButton/chemGreen.png';
import chemRed from '../imageButton/chemRed.png';
import chemBlue from '../imageButton/chemBlue.png';
import trash from '../imageButton/trash.webp';

const LabTable = () => {
  const [inputValue, setInputValue] = useState("");


  // Para sa tatlong mukhang panturok
  const items = [
    { src: chemYellow, alt: "chemYellow", id: "p2-tips" },
    { src: chemGreen, alt: "chemYellow", id: "p200-tips" },
    { src: chemRed, alt: "chemYellow", id: "p1000-tips-red" },
    { src: chemBlue, alt: "chemYellow", id: "p1000-tips-blue" },
    { src: trash, alt: "chemYellow", id: "trash", isTrash: true },
  ];

  // Handle item click to update the input value
  const handleItemClick = (itemName) => {
    setInputValue(itemName);
  };

  return (
    <div className="lab-container">
      <h1>CHEMISTRY LABORATORY SIMULATION</h1>
      <div className="shelf">
        {items.slice(0, 4).map((item) => (
          <ItemImage
            key={item.id}
            src={item.src}
            alt={item.alt}
            id={item.id}
            isTrash={item.isTrash}
            onItemClick={handleItemClick}
          />
        ))}
      </div>
      <div className="table">
        {items.slice(4).map((item) => (
          <ItemImage
            key={item.id}
            src={item.src}
            alt={item.alt}
            id={item.id}
            isTrash={item.isTrash}
            onItemClick={handleItemClick}
          />
        ))}
      </div>

        // text screen
      <div className="chem-screen">
        <input type="text" value={inputValue} disabled />
      </div>

      // Buttons for chems
      <div className="chemical-button">
        <button onClick={() => setInputValue("chem1")}>chem1</button>
        <button onClick={() => setInputValue("chem2")}>chem2</button>
        <button onClick={() => setInputValue("chem3")}>ADD</button>
      </div>
    </div>
  );
};

export default LabTable;
