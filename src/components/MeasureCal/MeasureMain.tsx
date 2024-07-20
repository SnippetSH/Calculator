import '../../index.css';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Unit, tip } from "../../shared/type/UnitType";
import UnitComp from "./UnitComp";
import images from "../../style/image";
import useHorizontalScroll from '../../shared/api/horizontalScroll';

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

  const gap = 4;
  return (
    <div id="measure" className="flex items-center justify-center h-screen flex-col" >
      <div id="black-box" className="bg-stone-950 w-1/6" style={{ maxWidth: '400px', maxHeight: '430px', minWidth: '300px' }}>

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
      <div id="DownKeypad" className='bg-stone-950 w-1/6 py-1 grid grid-cols-1 gap-2 mx-1' style={{ maxWidth: '400px', minWidth: '300px' }}>
        <div id='second-col' className={`grid grid-cols-4 gap-${gap} mx-2`}>
          {/** 7 숫자 */}
          <button ref={buttonRefs} style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>7</button>
          {/** 8 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>8</button>
          {/** 9 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>9</button>
          {/** * 곱하기 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><img src={`${images.remove}`} width={'50px'} /></button>
        </div>
        <div id='third-col' className={`grid grid-cols-4 gap-${gap}`}>
          {/** 4 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>4</button>
          {/** 5 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>5</button>
          {/** 6 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>6</button>
          {/** - 빼기 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><h1 className='text-red-400'>C</h1></button>
        </div>
        <div id='forth-col' className={`grid grid-cols-4 gap-${gap}`}>
          {/** 1 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>1</button>
          {/** 2 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>2</button>
          {/** 3 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>3</button>
          {/** + 더하기 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><img src={`${images.plus}`} width={'25px'} /></button>
        </div>
        <div id='fifth-col' className={`grid grid-cols-4 gap-${gap}`}>
          {/** +/- 플마 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-2xl max-w-20 bg-slate-800 text-white rounded-full'>+/-</button>
          {/** 0 숫자 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>0</button>
          {/** . 소숫점 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>.</button>
          {/** = 등호 */}
          <button style={{ height: `${buttonWidths}px` }} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-green-500 text-white rounded-full'><img src={`${images.equal}`} width={'25px'} /></button>
        </div>
      </div>
    </div>
  )
}