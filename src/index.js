import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import Loadout from "./Loadout";
import survivorPerks from "./data/survivor-perks.json";
import killerPerks from "./data/killer-perks.json";
import killer from "./img/killer.png";
import survivor from "./img/survivor.png";

function App() {
  const [player, setPlayer] = useState(true);
  const [selected, setSelected] = useState(null);

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    const path = window.location?.hash;
    const save = path.split("#")[1] ?? "";
    console.log(save);
    if (save.length > 1) {
      try {
        const obj = JSON.parse(atob(save));
        console.log(obj.player, obj.perks);

        setPlayer(obj.player);
        setSelected(obj.perks);
      } catch (error) {
        console.log(error);
      }
    }

    // btoa(JSON.stringify({
    //   player: false,
    //   perks: [1, 2, 3, 4],
    // }));
    // console.log(JSON.parse(atob(save)));

    // if (save.length === 13) {
    //   let values = save
    //     .replaceAll(/(^.)(.{3})(.{3})(.{3})(.{3})/gm, "$1;$2;$3;$4;$5")
    //     .split(";");
    //   const [player, ...perks] = values;

    //   // const obj = { player: player, perks: perks };
    //   console.log("Carregado da url", Boolean(Number(player)), perks);
    //   setPlayer(Boolean(Number(player)));
    //   setSelected(perks);
    // }
  }, []);

  return (
    <div className="app">
      <div>
        <img
          src={player ? survivor : killer}
          alt="player icon"
          onClick={() => setPlayer(!player)}
          className="player-select"
        />
      </div>
      <Loadout
        title={player ? "Survivor" : "Killer"}
        allPerks={
          player ? survivorPerks.sort(compare) : killerPerks.sort(compare)
        }
        selected={selected}
        player={player}
      />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
