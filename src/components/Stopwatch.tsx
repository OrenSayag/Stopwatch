import React, { useEffect, useState } from "react";
import { isGetAccessorDeclaration } from "typescript";
import "../scss/tailwind.scss";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

type stopwatchProps = {
  lapRecorder: Function;
  currLapLength: number;
  textColor?: string,
};

export const Stopwatch = ({ lapRecorder, currLapLength, textColor,  }: stopwatchProps) => {
  // FUCNTIONS
  const lapFormatter = (time: number) => {
    const lapIndex = currLapLength + 1;

    const ms = time % 1000;
    time = (time - ms) / 1000;
    const secs = time % 60;
    time = (time - secs) / 60;
    const mins = time % 60;
    const hrs = (time - mins) / 60;

    return {
      lapIndex,
      ms: ("0" + ms.toString()).slice(-2),
      secs: ("0" + secs.toString()).slice(-2),
      mins: ("0" + mins.toString()).slice(-2),
      hrs: ("0" + hrs.toString()).slice(-2),
    };
  };


  //STATE
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [reverseTickColor, setReverseTickColor] = useState(false);

  //TOOLS
  const tickArr:number[] = [];
  const colorsArr:string[] = [
    'bg-gray-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  (()=>{
    for (let index = 0; index < 100; index++) {
      tickArr.push(index)
    }
  })()
  

  useEffect(() => {
    let interval: any = null;

    if(time%1000===0){
      setReverseTickColor(!reverseTickColor)
    }

    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start, time]);
  return (
    <div
      className="w-screen flex justify-center items-center
    flex-col h-96 relative mb-10
    "
    >
      {/* <div></div> */}

      {/* <div>{time % 1000}</div> */}

      <ul
        className="clockline h-96 flex absolute w-screen  -rotate-90	
      "
        id="clockline"
      >
        
        {tickArr.map((num)=><li key={Math.random()} className={((time%1000)/10>(num/1.05))? ( !reverseTickColor ? colorsArr[Math.floor(Math.random()*colorsArr.length)] : 'bg-green-200') : ((!reverseTickColor || time==0) ? 'bg-green-200': colorsArr[Math.floor(Math.random()*colorsArr.length)])}></li>)}
        
      </ul>

      

      <div className={`clock text-2xl font-serif font-thin ${textColor || ''}`}>
        <div>
          <span>{Math.floor(time/(60*60_000)).toString()}</span>:
          <span>{("0" + Math.floor((time / 60_000) % 60)).slice(-2)}</span>:
          <span>{("0" + Math.floor((time / 1_000) % 60)).slice(-2)}</span>:
          <span>{("0" + ((time / 10) % 1000)).slice(-2)}</span>
        </div>
      </div>

      <div className="z-10 w-60 flex justify-center gap-5
       rounded absolute -bottom-5
      ">
        {!start ? (
          <button
          className=" rounded bg-indigo-900 p-3 hover:bg-indigo-700
          
          "
          onClick={() => setStart(true)}><PlayArrowIcon /></button>
        ) : (
          <button
          className=" rounded bg-indigo-900 p-3 hover:bg-indigo-700
          
          "
          onClick={() => setStart(false)}><PauseIcon /></button>
        )}
        <button
className=" rounded bg-indigo-900 p-3 hover:bg-indigo-700

"

          onClick={() => {
            setStart(false);
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
