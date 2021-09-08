import React, { useState } from "react";
import logo from "./logo.svg";
import "./scss/tailwind.scss";
import "./App.css";
import { LapsDisplay } from "./components/LapsDisplay";
import { Stopwatch } from "./components/Stopwatch";
import Lap from "./models/lap.model";

function App() {
  // FUNCTIONS
  const lapRecorder = (lapObj: Lap) => {
    // console.log(lapObj)
    setLaps([...laps, lapObj]);
    let temp: Lap[] = [];
    if (localStorage.logOfLaps) {
      temp = JSON.parse(localStorage.logOfLaps);
    }
    temp.push(lapObj);
    localStorage.logOfLaps = JSON.stringify(temp);
    // console.log(localStorage.logOfLaps)
  };

  const clearLapHistory = () => {
    localStorage.removeItem("logOfLaps");
    setLaps([]);
  };

  // const lapStorageInit

  // STATE

  const [laps, setLaps] = useState<Lap[]>(
    JSON.parse(localStorage.getItem("logOfLaps") || "[]")
  );

  return (
    <div
      className="App
    bg-yellow-900
    h-screen text-yellow-400 select-none
    grid grid-rows-2 
    outline-none
    overflow-auto

    "
    >
      <div className="h-screen w-screen bg-black absolute opacity-60"></div>

      <div className="flex max-h-1/2 items-center justify-center">
        <Stopwatch currLapLength={laps.length} lapRecorder={lapRecorder} />
      </div>

      <div className="max-h-1/2 flex flex-col items-center">
        <LapsDisplay clearLapHistory={clearLapHistory} laps={laps} />
      </div>
    </div>
  );
}

export default App;
