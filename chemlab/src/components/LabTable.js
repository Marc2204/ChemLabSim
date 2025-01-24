import React from "react";
import ItemButton from "./ItemButton";

const LabTable = () => {
  return (
    <div className="lab-container">
      <h1>Interactive Lab</h1>
      {/* Shelf */}
      <div className="shelf">
        <ItemButton label="P2 Tips" id="p2-tips" />
        <ItemButton label="P200 Tips" id="p200-tips" />
        <ItemButton label="P1000 Tips" id="p1000-tips" />
        <ItemButton label="Agarose Gel" id="agarose-gel" />
        <ItemButton label="1x Sodium Borate Buffer" id="sodium-borate-buffer" />
      </div>

      {/* Table */}
      <div className="table">
        <ItemButton label="P2 Pipette" id="p2-pipette" />
        <ItemButton label="P20 Pipette" id="p20-pipette" />
        <ItemButton label="P200 Pipette" id="p200-pipette" />
        <ItemButton label="P1000 Pipette" id="p1000-pipette" />
        <ItemButton label="Power Supply" id="power-supply" />
        <ItemButton label="Gel Electrophoresis Box" id="gel-box" />
        <ItemButton label="Trash" id="trash" />
      </div>
    </div>
  );
};

export default LabTable;
