import React, { useState, useEffect } from "react";
import "./Loadout.scss";
import { Input, Modal } from "antd";

import Perk from "./Perk";

function replaceSpecialChars(str) {
  if (Boolean(str)) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
    str = str.replace(/[àáâãäå]/, "a");
    str = str.replace(/[ÈÉÊË]/, "E");
    str = str.replace(/[éèêë]/, "e");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[ç]/, "c");

    return str.replace(/[^a-z0-9]/gi, "");
  } else {
    return "";
  }
}

function Loadout({ allPerks, title }) {
  const [chooser, setChooser] = useState({ open: false, index: null });
  const [survivor, setSurvivor] = useState([null, null, null, null]);

  const [allSurvivorPerks, setAllSurvivorPerks] = useState(allPerks);

  useEffect(() => {
    setSurvivor([null, null, null, null]);
  }, [allPerks]);

  const handleFilter = (text) => {
    if (Boolean(text) === false) {
      setAllSurvivorPerks(allPerks);
    } else {
      const sanitizedText = replaceSpecialChars(text);
      const filter = new RegExp(sanitizedText, "i");
      const array = allPerks.filter((perk) => {
        return (
          replaceSpecialChars(perk.name).match(filter) ||
          replaceSpecialChars(perk.character).match(filter) ||
          replaceSpecialChars(perk.desc).match(filter) ||
          replaceSpecialChars(perk.type).match(filter) ||
          replaceSpecialChars(perk.rarity).match(filter) ||
          replaceSpecialChars(perk.realName).match(filter)
        );
      });

      setAllSurvivorPerks(array);
    }
  };

  const handleClick = (index) => {
    setAllSurvivorPerks(allPerks);
    setChooser((prev) => ({ open: !prev.open, index: index }));
  };

  const handleChoose = (perk) => {
    setChooser((selected) => {
      setSurvivor((prevSurvivor) => {
        const newSurvivor = [...prevSurvivor];
        newSurvivor[selected.index] = perk;

        if (survivor.includes(perk)) {
          if (survivor.indexOf(perk) === selected.index) {
            newSurvivor[selected.index] = null;
          } else {
            newSurvivor[selected.index] = perk;
            newSurvivor[survivor.indexOf(perk)] = null;
          }
        }

        return newSurvivor;
      });
      return { open: false, index: null };
    });
  };

  const handleClose = () => {
    setChooser({ open: false, index: null });
  };

  return (
    <div className="loadout">
      <Modal
        title={
          <div>
            <p>Select a perk</p>
            <Input
              placeholder="Search for perks (name, character, function...)"
              onChange={(e) => handleFilter(e.target.value)}
              allowClear
            />
          </div>
        }
        onCancel={handleClose}
        visible={chooser.open}
        footer={false}
        centered
        width={1000}
        zIndex={10}
        destroyOnClose
      >
        <div className="choose-perk">
          <Perk onClick={() => handleChoose(null)} />
          {allSurvivorPerks.map((perk) => (
            <Perk
              onClick={() => handleChoose(perk)}
              perk={perk}
              selected={survivor.includes(perk)}
            />
          ))}
        </div>
      </Modal>
      <h3>{title}</h3>
      <section>
        {survivor.map((perk, index) => (
          <Perk onClick={() => handleClick(index)} perk={perk} />
        ))}
      </section>
      {/* </Popover> */}
    </div>
  );
}

export default Loadout;
