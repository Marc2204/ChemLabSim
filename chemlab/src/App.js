import React, { useState } from "react";
import "./App.css";
import LabTable from "./components/LabTable";
import waterImage from './assets/images/waters.png';
import sodiumImage from './assets/images/sodiums.jpg';
import chlorineImage from './assets/images/chlorines.png';

// Define the Molecule class
class Molecule {
  constructor(name, formula, reactWith, products, image) {
    this.name = name;
    this.formula = formula;
    this.reactWith = reactWith;  // List of molecules this molecule reacts with
    this.products = products;   // List of products when reacting
    this.image = image;         // Image URL
  }

  react(otherMolecule) {
    if (this.reactWith.includes(otherMolecule.name)) {
      return {
        success: true,
        message: `A chemical reaction occurs between ${this.name} and ${otherMolecule.name}!`,
        products: this.products[otherMolecule.name] || "Unknown product"
      };
    } else {
      return {
        success: false,
        message: `No reaction occurs between ${this.name} and ${otherMolecule.name}.`,
        products: null
      };
    }
  }
}

// Define some molecules with their images
const water = new Molecule(
  "Water",
  "H2O",
  ["Sodium", "Chlorine"],
  {
    Sodium: "Sodium Hydroxide (NaOH)",
    Chlorine: "Hydrochloric Acid (HCl)",
  },
  waterImage  // Use the imported image here
);

const sodium = new Molecule(
  "Sodium",
  "Na",
  ["Water"],
  {
    Water: "Sodium Hydroxide (NaOH)",
  },
  sodiumImage // Use the imported image here
);

const chlorine = new Molecule(
  "Chlorine",
  "Cl2",
  ["Water"],
  {
    Water: "Hydrochloric Acid (HCl)",
  },
  chlorineImage  // Use the imported image here
);

const App = () => {
  const [showHome, setShowHome] = useState(false);
  const [showMoleculeInteraction, setShowMoleculeInteraction] = useState(false);
  const [molecule1, setMolecule1] = useState(null);
  const [molecule2, setMolecule2] = useState(null);
  const [reactionResult, setReactionResult] = useState("");
  const [reactionProducts, setReactionProducts] = useState("");

  if (showHome) {
    return <LabTable />;
  }

  const handleMolecule1Select = (event) => {
    const moleculeName = event.target.value;
    setMolecule1(moleculeName);
  };

  const handleMolecule2Select = (event) => {
    const moleculeName = event.target.value;
    setMolecule2(moleculeName);
  };

  const handleReact = () => {
    if (!molecule1 || !molecule2) {
      setReactionResult("Please select two molecules to combine.");
      setReactionProducts("");
      return;
    }

    // Directly use the molecule variables
    const mol1 = { water, sodium, chlorine }[molecule1.toLowerCase()];
    const mol2 = { water, sodium, chlorine }[molecule2.toLowerCase()];

    // Run the reaction check
    const reaction = mol1.react(mol2);

    setReactionResult(reaction.message);
    if (reaction.success) {
      setReactionProducts(`The products formed are: ${reaction.products}`);
    } else {
      setReactionProducts("");
    }
  };

  return (
    <div className="chem-container">
      <form className="chem-form">
        <div className="chem-row">
          <div className="chem-item">
            <p>Create Chemicals</p>
            <button onClick={() => setShowHome(true)}>Click Chem</button>
          </div>
          <div className="chem-item">
            <p>Interact with Molecules</p>
            <button
              onClick={() => setShowMoleculeInteraction(true)}
              type="button"
            >
              Click Mole
            </button>
          </div>
          <div className="chem-item">
            <p>Interactive Learning</p>
            <button>Click inter</button>
          </div>
        </div>
      </form>

      {/* Show molecule interaction form */}
      {showMoleculeInteraction && (
        <div>
          <h2>Choose Molecules to React</h2>
          <div>
            <select onChange={handleMolecule1Select}>
              <option value="">Select Molecule 1</option>
              <option value="water">Water</option>
              <option value="sodium">Sodium</option>
              <option value="chlorine">Chlorine</option>
            </select>

            <select onChange={handleMolecule2Select}>
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

          {/* Display images of selected molecules */}
          <div>
            <h4>Selected Molecule 1:</h4>
            {molecule1 && (
              <div>
                <p>{molecule1}</p>
                <img
                  src={{ water: waterImage, sodium: sodiumImage, chlorine: chlorineImage }[molecule1.toLowerCase()]}
                  alt={molecule1}
                  style={{ width: "100px" }}
                />
              </div>
            )}

            <h4>Selected Molecule 2:</h4>
            {molecule2 && (
              <div>
                <p>{molecule2}</p>
                <img
                  src={{ water: waterImage, sodium: sodiumImage, chlorine: chlorineImage }[molecule2.toLowerCase()]}
                  alt={molecule2}
                  style={{ width: "100px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
