import React, { useState } from "react";
import waterImage from "../assets/images/waters.png";
import sodiumImage from "../assets/images/sodiums.jpg";
import chlorineImage from "../assets/images/chlorines.png";

// Define the Molecule class
class Molecule {
  constructor(name, formula, reactWith, products, image) {
    this.name = name;
    this.formula = formula;
    this.reactWith = reactWith;
    this.products = products;
    this.image = image;
  }

  react(otherMolecule) {
    if (this.reactWith.includes(otherMolecule.name)) {
      return {
        success: true,
        message: `A chemical reaction occurs between ${this.name} and ${otherMolecule.name}!`,
        products: this.products[otherMolecule.name] || "Unknown product",
      };
    } else {
      return {
        success: false,
        message: `No reaction occurs between ${this.name} and ${otherMolecule.name}.`,
        products: null,
      };
    }
  }
}

// Define molecules
const water = new Molecule("Water", "H2O", ["Sodium", "Chlorine"], {
  Sodium: "Sodium Hydroxide (NaOH)",
  Chlorine: "Hydrochloric Acid (HCl)",
}, waterImage);

const sodium = new Molecule("Sodium", "Na", ["Water"], {
  Water: "Sodium Hydroxide (NaOH)",
}, sodiumImage);

const chlorine = new Molecule("Chlorine", "Cl2", ["Water"], {
  Water: "Hydrochloric Acid (HCl)",
}, chlorineImage);

const Molecules = () => {
  const [molecule1, setMolecule1] = useState(null);
  const [molecule2, setMolecule2] = useState(null);
  const [reactionResult, setReactionResult] = useState("");
  const [reactionProducts, setReactionProducts] = useState("");

  const handleMoleculeSelect = (event, setMolecule) => {
    const moleculeName = event.target.value;
    setMolecule(moleculeName);
  };

  const handleReact = () => {
    if (!molecule1 || !molecule2) {
      setReactionResult("Please select two molecules to combine.");
      setReactionProducts("");
      return;
    }

    const mol1 = { water, sodium, chlorine }[molecule1.toLowerCase()];
    const mol2 = { water, sodium, chlorine }[molecule2.toLowerCase()];

    const reaction = mol1.react(mol2);
    setReactionResult(reaction.message);
    setReactionProducts(reaction.success ? `The products formed are: ${reaction.products}` : "");
  };

  return (
    <div>
      <h2>Choose Molecules to React</h2>
      <div>
        <select onChange={(e) => handleMoleculeSelect(e, setMolecule1)}>
          <option value="">Select Molecule 1</option>
          <option value="water">Water</option>
          <option value="sodium">Sodium</option>
          <option value="chlorine">Chlorine</option>
        </select>

        <select onChange={(e) => handleMoleculeSelect(e, setMolecule2)}>
          <option value="">Select Molecule 2</option>
          <option value="water">Water</option>
          <option value="sodium">Sodium</option>
          <option value="chlorine">Chlorine</option>
        </select>
      </div>
      
      <button onClick={handleReact}>React</button>

      <div>
        <h3>Reaction Result:</h3>
        <p>{reactionResult}</p>
        {reactionProducts && <p>{reactionProducts}</p>}
      </div>

      <div>
        <h4>Selected Molecule 1:</h4>
        {molecule1 && <img src={{ water: waterImage, sodium: sodiumImage, chlorine: chlorineImage }[molecule1.toLowerCase()]} alt={molecule1} style={{ width: "100px" }} />}

        <h4>Selected Molecule 2:</h4>
        {molecule2 && <img src={{ water: waterImage, sodium: sodiumImage, chlorine: chlorineImage }[molecule2.toLowerCase()]} alt={molecule2} style={{ width: "100px" }} />}
      </div>
    </div>
  );
};

export default Molecules;
