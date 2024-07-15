import '../App.css';
import { useEffect, useState, useRef } from 'react';
import images from '../assets/image';
import { numberStore, operatorStore, numIdxStore } from '../store/store';

export default function CalPart() {
  const buttonRefs = useRef<HTMLButtonElement>(null);
  const [buttonWidths, setButtonWidths] = useState(0);

  useEffect(() => {
    if(buttonRefs.current) {
      setButtonWidths(buttonRefs.current.offsetWidth)
    }

    const handleResize = () => {
      if(buttonRefs.current) {
        setButtonWidths(buttonRefs.current.offsetWidth);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const addMore = numberStore((state) => state.addMore);
  const addNum = numberStore((state) => state.addNum);

  const addOperator = operatorStore((state) => state.addOperator);
  const removeOperator = operatorStore((state) => state.removeOperator);
  const currentLength = numberStore((state) => state.currentLength);
  const numIdx = numIdxStore((state) => state.numIdx);
  const setNumIdx = numIdxStore((state) => state.setNumIdx);

  const handleNumClicked = (x: number) => {
    if(currentLength[numIdx] === undefined) {
      addMore();
      addNum(numIdx, x);
    } else {
      addNum(numIdx, x);
    }
  }

  const handleMoreClicked = (operator: string) => {
    if(currentLength[numIdx] === 0) {
      removeOperator();
      addOperator(operator);
    } else {
      addMore();
      addOperator(operator);
      setNumIdx(true);
    }
  }

  const handleResetClicked = () => {
    numberStore.getState().reset();
    numIdxStore.getState().reset();
    operatorStore.getState().reset();
  }

  const gap = 2;

  return(
    <div className={`grid grid-cols-1 gap-1.5 my-2 mx-1`}>
      <div id='first-col' className={`grid grid-cols-4 gap-${gap}`}> 
        {/** C초기화*/}
        <button onClick={ () => handleResetClicked() } style={{height: `${buttonWidths}px`}} ref={buttonRefs} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-neutral-500 text-red-400 rounded-full'>C</button>
        {/** () 괄호 */}
        <button style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-neutral-500 rounded-full text-green-600'><img src={`${images.bracket}`} width={'25px'} /></button>
        {/** % 퍼센트  */}
        <button style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-neutral-500 rounded-full text-green-600'><img src={`${images.percent}`} width={'27px'} /></button>
        {/** / 나누기 */}
        <button onClick={ () => handleMoreClicked('/') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-neutral-500 rounded-full text-green-600'><img src={`${images.divide}`} width={'28px'} /></button>
      </div>
      <div id='second-col' className={`grid grid-cols-4 gap-${gap}`}> 
        {/** 7 숫자 */}
        <button onClick={ () => handleNumClicked(7) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>7</button>
        {/** 8 숫자 */}
        <button onClick={ () => handleNumClicked(8) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>8</button>
        {/** 9 숫자 */}
        <button onClick={ () => handleNumClicked(9) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>9</button>
        {/** * 곱하기 */}
        <button onClick={ () => handleMoreClicked('*') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-neutral-500 rounded-full text-green-600'><img src={`${images.multiple}`} width={'20px'} /></button>
      </div>
      <div id='third-col' className={`grid grid-cols-4 gap-${gap}`}> 
        {/** 4 숫자 */}
        <button onClick={ () => handleNumClicked(4) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>4</button>
        {/** 5 숫자 */}
        <button onClick={ () => handleNumClicked(5) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>5</button>
        {/** 6 숫자 */}
        <button onClick={ () => handleNumClicked(6) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>6</button>
        {/** - 빼기 */}
        <button onClick={ () => handleMoreClicked('-') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-neutral-500 rounded-full text-green-600'><img src={`${images.minus}`} width={'25px'} /></button>
      </div>
      <div id='forth-col' className={`grid grid-cols-4 gap-${gap}`}> 
        {/** 1 숫자 */}
        <button onClick={ () => handleNumClicked(1) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>1</button>
        {/** 2 숫자 */}
        <button onClick={ () => handleNumClicked(2) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>2</button>
        {/** 3 숫자 */}
        <button onClick={ () => handleNumClicked(3) } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>3</button>
        {/** + 더하기 */}
        <button onClick={ () => handleMoreClicked('+') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-neutral-500 rounded-full text-green-600'><img src={`${images.plus}`} width={'25px'} /></button>
      </div>
      <div id='fifth-col' className={`grid grid-cols-4 gap-${gap}`}> 
        {/** +/- 플마 */}
        <button style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>+/-</button>
        {/** 0 숫자 */}
        <button style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>0</button>
        {/** . 소숫점 */}
        <button style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-slate-800 text-white rounded-full'>.</button>
        {/** = 등호 */}
        <button style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-24 bg-green-500 text-white rounded-full'><img src={`${images.equal}`} width={'25px'} /></button>
      </div>
    </div>
  )
}