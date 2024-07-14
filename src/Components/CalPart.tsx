import '../App.css';
import { useEffect, useState, useRef } from 'react';

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

  const gap = 2;

  return(
    <div className={`grid grid-cols-1 gap-1.5 my-2 mx-1`}>
      <div id='first-col' className={`grid grid-cols-4 gap-${gap}`}> 
        <button style={{height: `${buttonWidths}px`}} ref={buttonRefs} className=' bg-neutral-500 rounded-full'>C</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-neutral-500 rounded-full'>()</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-neutral-500 rounded-full'>%</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-neutral-500 rounded-full'>÷</button>
      </div>
      <div id='second-col' className={`grid grid-cols-4 gap-${gap}`}> 
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>7</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>8</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>9</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-neutral-500 rounded-full'>×</button>
      </div>
      <div id='third-col' className={`grid grid-cols-4 gap-${gap}`}> 
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>4</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>5</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>6</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-neutral-500 rounded-full'>-</button>
      </div>
      <div id='forth-col' className={`grid grid-cols-4 gap-${gap}`}> 
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>1</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>2</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>3</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-neutral-500 rounded-full'>+</button>
      </div>
      <div id='fifth-col' className={`grid grid-cols-4 gap-${gap}`}> 
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>+/-</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>0</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-slate-800 text-white rounded-full'>.</button>
        <button style={{height: `${buttonWidths}px`}} className=' bg-neutral-500 rounded-full'>=</button>
      </div>
    </div>
  )
}