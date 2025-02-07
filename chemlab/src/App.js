import React from "react";
import { useState } from "react";

import "./App.css";
import LabTable from "./components/LabTable";

const App = () => {
  const [showHome, setShowHome] = useState(false);

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
            <button>Click Mole</button>
          </div>
          <div className="chem-item">
            <p>Interactive Learning</p>
            <button>Click inter</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;