import React, { useEffect, useState } from "react";
import { isGetAccessorDeclaration } from "typescript";
import "../scss/tailwind.scss";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Pause from "@material-ui/icons/Pause";

type stopwatchProps = {
  lapRecorder: Function;
  currLapLength: number;
  textColor?: string;
};

export const Stopwatch = ({
  lapRecorder,
  currLapLength,
  textColor,
}: stopwatchProps) => {
  // FUCNTIONS
  const lapFormatter = (time: number) => {
    // console.log(time)
    const lapIndex = currLapLength + 1;

    let diffInHrs = time / 3600000;
    let hrs = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hrs) * 60;
    let mins = Math.floor(diffInMin);

    

    let diffInSec = (diffInMin - mins) * 60;
    let secs = Math.floor(diffInSec);

    let diffInMs = (diffInSec - secs) * 100;
    let ms = Math.floor(diffInMs);

    return {
      lapIndex,
      ms: ("0" + ms.toString()).slice(-2),
      secs: ("0" + secs.toString()).slice(-2),
      mins: ("0" + mins.toString()).slice(-2),
      hrs: ("0" + hrs.toString()).slice(-2),
    };
  };

  const run = () => {
    setStart(true);
    const startTime = Date.now() - time;
    const interval = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10);

    setIntervalID(interval);
  };

  const pause = () => {
    clearInterval(intervalID);
    setStart(false);
  };
  
  const reset = () => {
    setTime(0);
    setStart(false);
    clearInterval(intervalID);
  };

  //STATE
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [reverseTickColor, setReverseTickColor] = useState(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>(
    setTimeout(() => {
      console.log("");
    }, 0)
  );

  //TOOLS
  const tickArr: number[] = [];
  // const colorsArr:string[] = [
  //   'bg-gray-500',
  //   'bg-red-500',
  //   'bg-yellow-500',
  //   'bg-green-500',
  //   'bg-blue-500',
  //   'bg-indigo-500',
  //   'bg-purple-500',
  //   'bg-pink-500',
  // ];
  (() => {
    for (let index = 0; index < 100; index++) {
      tickArr.push(index);
    }
  })();

  useEffect(() => {
    if (Math.floor((time%1000)/10) === 0) {
      setReverseTickColor(!reverseTickColor);
    }

    if (time === 0) {
      setReverseTickColor(false);
    }
  }, [time]);
  
  return (
    <div
      className="w-screen flex justify-center items-center
    flex-col h-96 relative mb-10 
    "
    >
      {/* CLOCK LINES */}
      <ul
        className="clockline h-96 flex absolute w-screen  -rotate-90	
      "
        id="clockline"
      >
        {tickArr.map((num) => (
          <li
            key={Math.random()}
            className={
              (time % 1000) / 10 > num / 1.05
                ? (!reverseTickColor
                  ? "bg-blue-500"
                  : "bg-green-200")
                : (!reverseTickColor || time == 0
                ? "bg-green-200"
                : "bg-blue-500")
            }
          ></li>
        ))}
      </ul>

      {/* TIME DISPLAY */}
      <div className={`clock text-2xl font-serif font-thin ${textColor || ""}`}>
        <div>
          <span>{Math.floor((time * 10) / (60 * 60_000)).toString()}</span>:
          <span>{("0" + Math.floor((time / 60_000) % 60)).slice(-2)}</span>:
          <span>{("0" + Math.floor((time / 1_000) % 60)).slice(-2)}</span>:
          <span>{("0" + Math.floor((time%1000)/10)).slice(-2)}</span>
        </div>
      </div>

      {/* BUTTONS CONTAINER */}
      <div
        className="z-10 w-60 flex justify-center gap-5
       rounded absolute bottom-0
      "
      >
        {/* <div>{reverseTickColor.toString()}</div>
        <div>{((time%1000)<100).toString()}</div>*/}
        {/* <div>{time}</div>
        <div>{time%1000/10}</div> */}
        {!start ? (
          <button
            className=" rounded bg-indigo-900 p-3 hover:bg-indigo-700
          
          "
            onClick={() => {
              run();
            }}
          >
            <PlayArrowIcon />
          </button>
        ) : (
          <button
            className=" rounded bg-indigo-900 p-3 hover:bg-indigo-700
          
          "
            onClick={() => {
              pause();
            }}
          >
            <PauseIcon />
          </button>
        )}
        <button
          className=" rounded bg-indigo-900 p-3 hover:bg-indigo-700

"
          onClick={() => {
            reset();
            setTime(0);
          }}
        >
          <RotateLeftIcon />
        </button>
        <button
          className=" rounded bg-indigo-900 p-3 hover:bg-indigo-700

"
          onClick={() => {
            // lapRecorder("hello");
            lapRecorder(lapFormatter(time));
          }}
        >
          <SaveIcon />
        </button>
      </div>
    </div>
  );
};
