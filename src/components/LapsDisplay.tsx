import React, { useEffect, useRef } from "react";
import Lap from "../models/lap.model";

type LapsProps = {
  laps: Lap[];
  clearLapHistory: Function;
};

export const LapsDisplay = ({ laps, clearLapHistory }: LapsProps) => {

    const myRef:any = useRef(null)


    useEffect(() => {
        console.log("New lap added!")
        if(myRef.current){
            
            myRef.current.scroll({
                top: myRef.current.scrollHeight
            })
        }
    }, [laps])

  return (
    <div
      className=" max-h-96 
        flex flex-col gap-3 w-full md:w-1/2 px-5 relative
        "
    >
      <div
        className="title
            text-4xl md:text-5xl lg:text-7xl left-10 top-5
            flex md:pl-5 md:pt-5 pb-2 font-mono italic uppercase border-b-2
            border-gray-400 justify-between items-end

            "
      >
          <div>
        Laps
          </div>
        <button
            className="text-sm font-sans text-gray-400"

          onClick={() => {
            clearLapHistory();
          }}
        >
          Clear Lap History
        </button>
      </div>
      <div>

        <div 
        ref={myRef}
        className="flex flex-col
         max-h-80
        overflow-y-scroll scrollbar-hide
        items-center gap-5
        ">
          {laps.map((lap) => {
            return (
              <div key={lap.lapIndex}
              className="
              flex justify-between w-full md:w-1/2 border-t-2 border-b-2 border-yellow-100
              py-3 px-2
              "
              >
                <div
                className="font-bold"
                >{lap.lapIndex}</div>
                <div>{`${lap.hrs}:${lap.mins}:${lap.secs}:${lap.ms}`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
