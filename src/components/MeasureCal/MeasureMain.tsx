import '../../index.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Unit, Tip } from "../../shared/type/UnitType";
import UnitComp from "./UnitComp";
import images from "../../style/image";

export default function MeasureMain() {
  const navigate = useNavigate();

  const [selectIdx, setSelectedIdx] = useState(3);

  return (
    <div id="measure" className="flex items-center justify-center h-screen" >
      <div id="black-box" className="bg-black w-1/6" style={{ maxWidth: '400px', maxHeight: '430px', minWidth: '300px' }}>

        <div id="header" className="flex flex-row justify-start align-middle my-1 mb-3 mx-2">
          <button onClick={() => navigate('/Calculator')} className="pl-2 pr-4"><img src={images.LessThan} width={'15 px-2px'}/></button>
          <h1 className="text-white text-xl">단위 계산기</h1>
        </div>

        <div id="contents" className="py-1 border-b-2 border-b-gray-400 border-opacity-30 mx-2 rounded-sm">
          <ul className="w-full flex flex-row overflow-x-auto overscroll-contain scroll-smooth text-zinc-400 text-base whitespace-nowrap no-scroll">
            {Unit.map((context, idx) => {
              return <li onClick={() => setSelectedIdx(idx)} key={"mes" + idx} className="w-15 px-2 inline-block">{context.id}</li>
            })}
            <li onClick={() => setSelectedIdx(Unit.length)} key={"mes" + Unit.length} className="w-15 px-2 inline-block">{Tip.id}</li>
          </ul>
        </div>
        <UnitComp renderIdx={selectIdx}></UnitComp>
      </div>
    </div>
  )
}