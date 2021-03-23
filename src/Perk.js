import React, { useState } from "react";
import { Popover } from "react-tiny-popover";

import "./Perk.scss";
import blank from "./img/blank.png";

function nameIntoFile(name) {
  return `${name
    ?.toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("'", "")
    .replaceAll(":", "")
    .replaceAll("!", "")}.png`;
}

const Perk = ({ onClick, perk, selected }) => {
  const [open, setOpen] = useState(false);

  const selectPerk = () => {
    // setPerk(survivorPerks[Math.round(Math.random(0, 20) * 10)]);
    setOpen(false);
    onClick();
  };

  return (
    <Popover
      isOpen={perk ? open : false}
      positions={["right", "bottom", "left", "top"]} // preferred positions by priority
      content={
        <div className="perk-data">
          <header>
            <span className="perk-title">{perk?.name}</span>
            <span>{`${perk?.rarity} ${perk?.character} Perk`}</span>
          </header>
          <div>{perk?.desc}</div>
        </div>
      }
    >
      <div
        className={`perk-diagram${selected ? " selected" : ""}`}
        onClick={selectPerk}
        onMouseOut={() => setOpen(false)}
        onMouseOver={() => setOpen(true)}
      >
        {perk ? (
          <>
            <div className={`perk${selected ? " selected" : ""}`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/${nameIntoFile(
                  perk?.name
                )}`}
                alt={nameIntoFile(perk?.name)}
              />
            </div>
            <span className="perk-name">{perk.name}</span>
          </>
        ) : (
          <>
            <img className="blank-perk" src={blank} alt="blank perk" />
            <span className="perk-name" style={{ opacity: 0 }}>
              Choose a perk
            </span>
          </>
        )}
      </div>
    </Popover>
  );
};

export default Perk;
