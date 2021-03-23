import React, { useState } from "react";
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

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

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
