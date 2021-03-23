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

function formatDesctription(desc) {
  if (desc) {
    const phrase = desc
      .replaceAll(/[.]\s/gim, ".<br/>")
      .replaceAll(
        /\s\d+\s[%]|\s\d+\s\w{2,7}\b|\s\d+[%]/gim,
        '<b class="yellow">$&</b>'
      )
      .replaceAll(
        /(\d\.\d|\d+)[/](\d\.\d|\d+)[/](\d\.\d|\d+)(\s\w{1,9}\b|\w{1,9}\b|\s[%]|[%])/gim,
        "<b class='yellow'>$1</b>/<b class='green'>$2</b>/<b class='purple'>$3</b> <b>$4</b>"
      )
      .replaceAll(/exit\sgates/gim, "<b class='orange'>$&</b>")
      .replaceAll(/skill\schecks?/gim, '<b class="orange">$&</b>')
      .replaceAll(/killer's|killers?/gim, "<b class='red'>$&</b>")
      .replaceAll(/auras?/gim, '<b class="orange">$&</b>')
      .replaceAll(/dying\sstate/gim, '<b class="red">$&</b>')
      .replaceAll(/bloodpoints?/gim, "<b class='red'>$&</b>")
      .replaceAll(
        /(slightly)[/](moderately)[/](considerably)/gim,
        "<b class='yellow'>$1</b>/<b class='green'>$2</b>/<b class='purple'>$3</b>"
      )
      .replaceAll(/survivor's?|survivors?/gim, '<b class="orange">$&</b>');
    return phrase;
  } else return "";
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
          <div
            dangerouslySetInnerHTML={{ __html: formatDesctription(perk?.desc) }}
          />
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
