import React, { useState, useEffect } from "react";
import { Input, Modal, Menu, message } from "antd";
import { Perk, Editable, IconButton } from "../components";
import domtoimage from "dom-to-image";

import {
  PictureOutlined,
  UndoOutlined,
  ShareAltOutlined,
  SaveOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import "./Loadout.scss";

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

function Loadout({
  allPerks,
  selected,
  setSelected,
  player,
  setPlayer,
  buildName,
  setBuildName,
  saved,
  setSaved,
}) {
  const [chooser, setChooser] = useState({ open: false, index: null });
  const [survivor, setSurvivor] = useState([null, null, null, null]);

  const [allSurvivorPerks, setAllSurvivorPerks] = useState(allPerks);

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setSurvivor([null, null, null, null]);
  }, [allPerks]);

  useEffect(() => {
    if (selected) {
      setSurvivor(selected.map((i) => allPerks[i]));
    }
    // eslint-disable-next-line
  }, [selected]);

  const handleFilter = (text) => {
    if (Boolean(text) === false) {
      setAllSurvivorPerks(allPerks);
    } else {
      const sanitizedText = replaceSpecialChars(text);
      const filter = new RegExp(sanitizedText, "gmiu");
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

  function copyToClipboard(text) {
    const elem = document.createElement("textarea");
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
  }

  const encodePerks = () => {
    const perks = survivor.map((p) => allPerks.indexOf(p));
    const savedObj = { player: player, perks: perks, buildName: buildName };
    return btoa(JSON.stringify(savedObj));
  };

  const handleShare = () => {
    console.log(survivor);
    if (!survivor.some((el) => Boolean(el) === false)) {
      const path = encodePerks();
      window.location.hash = path;
      copyToClipboard(window.location.href);
      message.success("URL copied to clipboard!");
    } else {
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search + ""
      );
    }
  };

  const handlePrint = () => {
    const node = document.querySelector("section");
    domtoimage.toPng(node, { bgcolor: "#000" }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = `${player ? "survivor" : "killer"}-loadout.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  const handleReset = () => {
    setSurvivor([null, null, null, null]);
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search + ""
    );
  };

  const handleSave = () => {
    if (!saved.includes(encodePerks())) {
      localStorage.setItem("builds", [...saved, encodePerks()]);
      setSaved([...saved, encodePerks()]);
    }
  };

  const handleRemoveSaved = (item) => {
    const auxSaved = [...saved];

    auxSaved.splice(auxSaved.indexOf(item), 1);
    localStorage.setItem("builds", auxSaved);

    setSaved(auxSaved);
  };

  const handleLoad = (item) => {
    const obj = JSON.parse(atob(item));
    window.location.hash = item;

    setPlayer(obj.player);
    setSelected(obj.perks);
    setBuildName(obj.buildName);
  };

  const getName = (code) => {
    return JSON.parse(atob(code)).buildName;
  };

  const menu = (
    <Menu className="saved-menu">
      {saved.map((item, i) => (
        <Menu.Item key={`${i}_${item}`}>
          <span onClick={() => handleLoad(item)}>{getName(item)}</span>
          <DeleteOutlined onClick={() => handleRemoveSaved(item)} />
        </Menu.Item>
      ))}
    </Menu>
  );

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
              autoFocus
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
      <h3>
        <Editable
          setEditable={setEditable}
          editable={editable}
          buildName={buildName}
          setBuildName={setBuildName}
        />
        <div>
          <IconButton
            onClick={handleShare}
            disabled={survivor.some((el) => Boolean(el) === false)}
            icon={<ShareAltOutlined />}
            title="Share url"
          />

          <IconButton
            title="Download image"
            onClick={handlePrint}
            disabled={survivor.some((el) => Boolean(el) === false)}
            icon={<PictureOutlined />}
          />

          <IconButton
            title="Save build"
            icon={<SaveOutlined />}
            onClick={handleSave}
            disabled={survivor.some((el) => Boolean(el) === false)}
          />

          <IconButton
            title="Reset perks"
            onClick={handleReset}
            icon={<UndoOutlined />}
          />

          <IconButton
            title="Saved builds"
            icon={<EllipsisOutlined />}
            overlay={menu}
            disabled={!Boolean(saved.length)}
          />
        </div>
      </h3>
      <section>
        {survivor.map((perk, index) => (
          <Perk onClick={() => handleClick(index)} perk={perk} />
        ))}
      </section>
    </div>
  );
}

export default Loadout;
