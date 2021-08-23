import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Popover } from "react-tiny-popover";

import "./Perk.scss";
import blank from "../img/blank.png";

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
        /(\s|[-+])\d+\s[%]|\s\d+\s\w{2,7}\b|\s\d+[%]/gim,
        '<b class="yellow big">$&</b>'
      )
      .replaceAll(
        /(\d\.\d|\d+)[/](\d\.\d|\d+)[/](\d\.\d|\d+)(\s\w{1,9}\b|\w{1,9}\b|\s[%°]|[%°])/gim,
        "<b class='yellow'>$1</b>/<b class='green'>$2</b>/<b class='purple'>$3</b> <b>$4</b>"
      )
      .replaceAll(/exit\sgates/gim, "<b class='orange'>$&</b>")
      .replaceAll(/skill\schecks?/gim, '<b class="orange">$&</b>')
      .replaceAll(/killer's|killers?/gim, "<b class='red'>$&</b>")
      .replaceAll(
        /(auras?)\s|\s(auras?)([.,])/gim,
        '<b class="orange"> $1 $2</b>$3'
      )
      .replaceAll(/locker?/gim, "<b class='orange'>$&</b>")
      .replaceAll(/generators?/gim, "<b class='orange'>$&</b>")
      .replaceAll(/dying\sstate/gim, '<b class="red">$&</b>')
      .replaceAll(/bloodpoints?/gim, "<b class='red'>$&</b>")
      .replaceAll(/exhausted?/gim, "<b >$&</b>")
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

  const handleClick = () => {
    if (isMobile) {
      setOpen(!open);
    } else {
      setOpen(false);
      onClick();
    }
  };

  const handleDoubleClick = () => {
    if (isMobile) {
      setOpen(false);
      onClick();
    } else {
      return;
    }
  };

  return (
    <Popover
      isOpen={perk ? open : false}
      positions={
        isMobile
          ? ["bottom", "top", "right", "left"]
          : ["right", "left", "bottom", "top"]
      }
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
        onClick={handleClick}
        onMouseOut={() => setOpen(false)}
        onMouseOver={() => setOpen(true)}
        onDoubleClick={handleDoubleClick}
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
