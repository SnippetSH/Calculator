import '../../style/index.css';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Unit, tip } from "../../shared/type/UnitType";
import UnitComp from "./UnitComp";
import images from "../../style/image";
import useHorizontalScroll from '../../shared/api/horizontalScroll';
import { measureStore } from '../../shared/stateStore/measurestore';

export default function MeasureMain() {
  const navigate = useNavigate();
  const elRef = useHorizontalScroll();
  const buttonRefs = useRef<HTMLButtonElement>(null);
  const [buttonWidths, setButtonWidths] = useState(0);

  useEffect(() => {
    if (buttonRefs.current) {
      setButtonWidths(buttonRefs.current.offsetWidth)
    }

    const handleResize = () => {
      if (buttonRefs.current) {
        setButtonWidths(buttonRefs.current.offsetWidth);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const [selectIdx, setSelectedIdx] = useState(3);


  useEffect(() => {
    measureStore.getState().reset();

  }, [selectIdx])



  const gap = 4;

  const [isTop, setTop] = useState(true);
  const pushTop = measureStore((state) => state.inputPush);
  const popTop = measureStore((state) => state.inputPop);

  const numClicked = (x: string) => {
    pushTop(x);
  }

  const removeClicked = () => {
    popTop(1);
  }

  return (
    <div id="measure" className="flex items-center justify-center h-screen flex-col">
      <div className='bg-stone-950 w-1/6 rounded-md' style={{ maxWidth: '405px', minWidth: '305px' }}>
        <div id="black-box" className="bg-stone-950" style={{ maxWidth: '400px', maxHeight: '430px', minWidth: '300px' }}>

          <div id="header" className="flex flex-row justify-start align-middle my-1 mb-3 mx-2">
            <button onClick={() => navigate('/Calculator')} className="pl-2 pr-4"><img src={images.LessThan} width={'15 px-2px'} /></button>
            <h1 className="text-white text-xl">단위 계산기</h1>
          </div>

          <div id="contents" className="py-1 border-b-2 border-b-gray-400 border-opacity-30 mx-2 rounded-sm">
            <ul ref={elRef} className="w-full flex flex-row overflow-x-auto overscroll-contain scroll-smooth text-zinc-400 text-base whitespace-nowrap no-scroll">
              {Unit.map((context, idx) => {
                if (idx === selectIdx) {
                  return <li onClick={() => setSelectedIdx(idx)} key={"mes" + idx} className="w-15 px-2 inline-block bg-gray-600 text-white rounded-3xl">{context.id}</li>
                }
                return <li onClick={() => setSelectedIdx(idx)} key={"mes" + idx} className="w-15 px-2 inline-block">{context.id}</li>
              })}
              <li onClick={() => setSelectedIdx(Unit.length)} key={"mes" + Unit.length} className={`w-15 px-2 inline-block ${selectIdx === 8 ? "bg-gray-600 text-white rounded-3xl" : ''}`}>{tip.id}</li>
            </ul>
          </div>
          <UnitComp renderIdx={selectIdx}></UnitComp>
        </div>
        <div id="DownKeypad" className='bg-stone-950 py-2 grid grid-cols-1 gap-2 mx-1' style={{ maxWidth: '400px', minWidth: '300px' }}>
          <div id='second-col' className={`grid grid-cols-4 gap-${gap} mx-2`}>
            {/** 7 숫자 */}
            <button onClick={() => numClicked("7")} ref={buttonRefs} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>7</button>
            {/** 8 숫자 */}
            <button onClick={() => numClicked("8")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>8</button>
            {/** 9 숫자 */}
            <button onClick={() => numClicked("9")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>9</button>
            {/** 지우기 */}
            <button onClick={() => removeClicked()} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-neutral-500 rounded-full'><img src={`${images.removeBright}`} width={'25px'} /></button>
          </div>
          <div id='third-col' className={`grid grid-cols-4 gap-${gap} mx-2`}>
            {/** 4 숫자 */}
            <button onClick={() => numClicked("4")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>4</button>
            {/** 5 숫자 */}
            <button onClick={() => numClicked("5")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>5</button>
            {/** 6 숫자 */}
            <button onClick={() => numClicked("6")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>6</button>
            {/** C 초기화 */}
            <button onClick={() => measureStore.getState().reset()} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className=' flex justify-center items-center text-3xl bg-neutral-500 rounded-full text-green-600'><h1 className='text-red-400'>C</h1></button>
          </div>
          <div id='forth-col' className={`grid grid-cols-4 gap-${gap} mx-2`}>
            {/** 1 숫자 */}
            <button onClick={() => numClicked("1")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>1</button>
            {/** 2 숫자 */}
            <button onClick={() => numClicked("2")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>2</button>
            {/** 3 숫자 */}
            <button onClick={() => numClicked("3")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>3</button>
            {/** 윗 화살표 */}
            <button onClick={() => setTop(true)} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-neutral-500 rounded-full text-green-600'><img src={`${isTop ? images.UpDark : images.UpBright}`} width={'35px'} /></button>
          </div>
          <div id='fifth-col' className={`grid grid-cols-4 gap-${gap} mx-2`}>
            {/** +/- 플마 */}
            <button style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-2xl bg-slate-800 text-neutral-500 rounded-full'>+/-</button>
            {/** 0 숫자 */}
            <button onClick={() => numClicked("0")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>0</button>
            {/** . 소숫점 */}
            <button onClick={() => numClicked(".")} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-slate-800 text-white rounded-full'>.</button>
            {/** 아래 화살표 */}
            <button onClick={() => setTop(false)} style={{ height: `${buttonWidths}px`, maxWidth: "76px" }} className='font-bold flex justify-center items-center text-3xl bg-neutral-500 text-white rounded-full'><img src={`${isTop ? images.DownBright : images.DownDark}`} width={'35px'} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}