import React, { useState } from "react";
import ItemImage from './ItemImage.js';
import chemYellow from '../imageButton/chemYellow.png';
import chemGreen from '../imageButton/chemGreen.png';
import chemRed from '../imageButton/chemRed.png';
import chemBlue from '../imageButton/chemBlue.png';
import trash from '../imageButton/trash.webp';
import styles from "../componentDesign/LabTable.module.css";

const LabTable = () => {
  const [inputValue, setInputValue] = useState("");

  const items = [
    { src: chemYellow, alt: "chemYellow", id: "p2-tips" },
    { src: chemGreen, alt: "chemYellow", id: "p200-tips" },
    { src: chemRed, alt: "chemYellow", id: "p1000-tips-red" },
    { src: chemBlue, alt: "chemYellow", id: "p1000-tips-blue" },
    { src: trash, alt: "chemYellow", id: "trash", isTrash: true },
  ];

  const handleItemClick = (itemName) => {
    setInputValue(itemName);
  };

  return (
    <>
      <div className={styles.shelf}>
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

      <div className={styles.table}>
        <button 
          type="button" 
          className={styles.trashButton} 
          onClick={() => handleItemClick("trash")}
        >
          <img src={trash} alt="Trash" className={styles.trashImage} />
        </button>
      </div>

      <div className={styles.chemScreen}>
        <input type="text" value={inputValue} disabled />
      </div>

      <div className={styles.chemicalButton}>
        <button onClick={() => setInputValue("chem1")}>chem1</button>
        <button onClick={() => setInputValue("chem2")}>chem2</button>
        <button onClick={() => setInputValue("chem3")}>ADD</button>
      </div>
    </>
  );
};

export default LabTable;
