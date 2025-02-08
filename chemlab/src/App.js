import React, { useState } from "react";
import "./App.css";
import LabTable from "./components/LabTable";
import Molecules from "./components/Molecules";

const App = () => {
  const [showHome, setShowHome] = useState(false);
  const [showMoleculeInteraction, setShowMoleculeInteraction] = useState(false);

  if (showHome) {
    return <LabTable />;
  }

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
            <button onClick={() => setShowMoleculeInteraction(true)} type="button">
              Click Mole
            </button>
          </div>
          <div className="chem-item">
            <p>Interactive Learning</p>
            <button>Click Learning</button>
          </div>
        </div>
      </form>

      {showMoleculeInteraction && <Molecules />}
    </div>
  );
};

export default App;
