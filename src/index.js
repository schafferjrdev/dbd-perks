import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "antd/dist/antd.min.css";
import { Loadout } from "./components";
import survivorPerks from "./data/survivor.json";
import killerPerks from "./data/killer.json";
import killer from "./img/killer.png";
import survivor from "./img/survivor.png";

/*
*
Download new perks every patch
https://dennisreep.nl/dbd/api/#/default/get_dbd_api_v3_getKillerPerkData

Trocar todas as imagens por:
https://images.weserv.nl/?url=
*/

function App() {
  const [player, setPlayer] = useState(true);
  const [selected, setSelected] = useState(null);
  const [buildName, setBuildName] = useState("My new build");
  const [saved, setSaved] = useState([]);

  function compare(a, b) {
    if (a.PerkName < b.PerkName) {
      return -1;
    }
    if (a.PerkName > b.PerkName) {
      return 1;
    }
    return 0;
  }

  //TODO: Criar um fetch para buscar os dados no futuro
  useEffect(() => {
    async function FetchPerks() {
      const response = await fetch(
        "https://dennisreep.nl/dbd/api/v3/getSurvivorPerkData"
      );

      const perks = await response.json();
      console.log("perks", perks);
    }
    FetchPerks();
  }, []);

  useEffect(() => {
    const path = window.location?.hash;
    const save = path.split("#")[1] ?? "";
    if (save.length > 1) {
      try {
        const obj = JSON.parse(atob(save));

        setPlayer(obj.player);
        setSelected(obj.perks);
        setBuildName(obj.buildName);
      } catch (error) {
        console.log(error);
      }
    }

    const builds = localStorage.getItem("builds");
    if (builds) {
      setSaved(builds.split(","));
    }
  }, []);

  return (
    <div className='app'>
      <div>
        <img
          src={player ? survivor : killer}
          alt='player icon'
          onClick={() => setPlayer(!player)}
          className='player-select'
        />
      </div>
      <Loadout
        title={player ? "Survivor" : "Killer"}
        allPerks={
          player ? survivorPerks.sort(compare) : killerPerks.sort(compare)
        }
        selected={selected}
        setSelected={setSelected}
        player={player}
        setPlayer={setPlayer}
        buildName={buildName}
        setBuildName={setBuildName}
        saved={saved}
        setSaved={setSaved}
      />
      <footer>
        <span>
          Game content and materials are trademarks and copyrights of{" "}
          <a href='https://www.bhvr.com' target='_blank' rel='noreferrer'>
            Behaviour
          </a>
          . All rights reserved.
        </span>
        <span>
          This is just a fanmade by{" "}
          <a
            href='https://github.com/schafferjrdev'
            target='_blank'
            rel='noreferrer'
          >
            Schaffer
          </a>
        </span>
      </footer>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
