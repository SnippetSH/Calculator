import { useEffect, useState, useRef } from 'react';
import images from '../../style/image';
import { equationStore } from '../../shared/stateStore/store';
import { resultStore } from '../../shared/stateStore/result';
import { bracketStore } from '../../shared/stateStore/bracket';
import { saveData } from '../../shared/api/localDBapi';
import Popup from '../assets/Popup';
import { handleNumClickedfunc } from '../../shared/api/handleNumClicked';

export default function CalPart() {
  const buttonRefs = useRef<HTMLButtonElement>(null);
  const [buttonWidths, setButtonWidths] = useState(0);
  const parentRefs = useRef<HTMLDivElement>(null);
  const [parentWidths, setParentWidths] = useState(0);

  useEffect(() => {
    if(buttonRefs.current) {
      setButtonWidths(buttonRefs.current.offsetWidth)
    }
    if(parentRefs.current) {
      setParentWidths(parentRefs.current.offsetWidth)
    }

    const handleResize = () => {
      if(buttonRefs.current) {
        setButtonWidths(buttonRefs.current.offsetWidth);
      }
      if(parentRefs.current) {
        setParentWidths(parentRefs.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const setShowResult = resultStore((state) => state.setShowResult);
  const showResult = resultStore((state) => state.showResult);
  const result = resultStore((state) => state.result);

  const [msg, setMsg] = useState("");

  /** 현재 식 */
  const curEqu = equationStore((state) => state.cur);
  /** 현재 식에 push */
  const pushEqu = equationStore((state) => state.push);
  /** 현재 식에서 parameter만큼 pop */
  const popEqu = equationStore((state) => state.pop);
  /** 현재 식에 일단 숫자 넣고, 얼마나 들어왔는지 저장. 연산자 들어올 때까지 대기 */
  const handleNumClicked = (x: string) => {
    /** 닫는 괄호로 현재 식이 마무리 된 경우
     * handleMoreClicked("*") 호출 후, 숫자 push
     */

    handleNumClickedfunc(x, curEqu, pushEqu, popEqu, showResult, setShowResult, setMsg, setShowPopup, setPopup);
    // if(curEqu[curEqu.length-1] === ")") {
    //   pushEqu("*");
    // }
    // if(showResult) {
    //   setShowResult(false);
    // }

    // if(x === "0" && curEqu[curEqu.length - 1] === "/") {
    //   setMsg("잘못된 입력입니다.")
    //   setShowPopup(true);
    //   setPopup(true);
    //   return;
    // }
    
    // let tmp = x
    // if(curEqu[curEqu.length - 1] === "-0") {
    //   popEqu(1);
    //   tmp = (-Number(x)).toString();
    // } else if(Number(curEqu[curEqu.length - 1]) === 0) {
    //   popEqu(1);
    // } else if(!isNaN(Number(curEqu[curEqu.length - 1])) || curEqu[curEqu.length - 1] === ".") {
    //   if(curEqu[curEqu.length - 1].length === 15) {
    //     setMsg("15자리까지 입력할 수 있어요.")
    //     setShowPopup(true);
    //     setPopup(true);
    //     return;
    //   }
    //   tmp = curEqu[curEqu.length - 1];
    //   popEqu(1);
    //   tmp += x;
    // }
    // pushEqu(tmp);
  }

  let [popup, setPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleMoreClicked = (operator: string) => {
    if(showResult) {
      pushEqu(result.toString());
      setShowResult(false);  
      pushEqu(operator);
      return;
    }

    if(curEqu[curEqu.length - 1] !== ")") {
      if(isNaN(Number(curEqu[curEqu.length - 1]))) {
        setMsg("완성되지 않은 수식입니다.");
        setPopup(true);
        setShowPopup(true);
      } else {
        pushEqu(operator);
      }
    } else {
      pushEqu(operator);
    }
  }

  useEffect(() => {
    let timer: number;
    if (popup) {
      timer = setTimeout(() => {
        setPopup(false);
      }, 1000);
    } else if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 300); // transition duration과 일치시킴
    }
    return () => clearTimeout(timer);
  }, [popup, showPopup]);

  const handleResetClicked = (x: boolean) => {
    equationStore.getState().reset();
    bracketStore.getState().reset();
    if(x) {
      resultStore.getState().reset();
    }
  }

  const handleEqualClicked = () => {
    saveData([...curEqu], result);
    handleResetClicked(false);
    setShowResult(true);
  }

  const setBracket = bracketStore((state) => state.setBracket);
  const bracketNum = bracketStore((state) => state.bracketNum);
  const handleBracketClicked = (x: string) => {
    /** 여는 괄호 '(' 누를 수 있는 경우:
     * 연산자로 현재 식이 끝났을 경우 ( currentLength[numIdx] === 0 ), => 그냥 여는 괄호를 추가
     * 숫자(.)로 끝났을 경우 ( currentLength[numIdx] !== 0) => 앞에 * 연산자를 추가한 후 괄호를 추가
     * 여는 괄호로 끝났을 경우(연산자와 같은 경우로 생각) => 그냥 여는 괄호 추가
     * 닫는 괄호로 끝났을 경우 => * 연산자 추가 후 여는 괄호 추가
     */

    if(showResult) {
      setShowResult(false);  
    }

    if(x === "(") {
      if(curEqu.length === 0) {
        pushEqu(x);
      } else {
        if(!isNaN(Number(curEqu[curEqu.length-1]))) { //현재 식의 마지막이 숫자일 경우
          pushEqu("*");
          pushEqu(x);
        } else if(curEqu[curEqu.length-1] === ")") {
          pushEqu("*");
          pushEqu(x);
        } else {
          pushEqu(x);
        }
      }
      setBracket(true);
    }

    /** 닫는 괄호 ')' 누를 수 있는 경우:
     * 숫자(.)로 끝났을 경우 ( currentLength[numIdx] !== 0) => 그냥 닫는 괄호 추가
     * 연산자 혹은 여는 괄호로 식이 끝났을 경우엔 안 됨.
     * 닫는 괄호로 끝났을 경우 => 그냥 닫는 괄호 추가
     */

    else if(x === ")" && bracketNum > 0) {
      if(!isNaN(Number(curEqu[curEqu.length-1]))) { //현재 식의 마지막이 숫자일 경우
        pushEqu(x);
        setBracket(false)
      } else if(curEqu[curEqu.length-1] === ")") {
        pushEqu(x);
        setBracket(false);
      } else {
        setMsg("완성되지 않은 수식입니다.");
        setPopup(true);
        setShowPopup(true);
      }
    } else {
      setMsg("완성되지 않은 수식입니다.");
      setPopup(true);
      setShowPopup(true);
    }
 
    /**
     * 여는 괄호가 클릭되면, bracket state 1 증가
     * 닫는 괄호가 클릭되면, bracket state 1 감소
     * 
     * bracket state는 Zustand로 관리해서 Print 컴포넌트에서도 사용 가능하도록 설정
     */
  }

  const handlePlusMinusClicked = () => {
    if (Number(curEqu[curEqu.length - 1]) <= 0 && curEqu[curEqu.length - 2] === "(") {
      let tmp = -Number(curEqu[curEqu.length - 1]);
      popEqu(2);
      setBracket(false);
      pushEqu(tmp.toString());
    } else if(!isNaN(Number(curEqu[curEqu.length - 1]))) {
      let tmp = -curEqu[curEqu.length - 1];
      popEqu(1);
      pushEqu("(");
      setBracket(true);
      pushEqu(tmp.toString());
    } else if(curEqu.length === 0) {
      pushEqu("(");
      setBracket(true);
      pushEqu("-0");
    } else if(isNaN(Number(curEqu[curEqu.length - 1]))) {
      pushEqu("(");
      setBracket(true);
      pushEqu("-0");
    }
  }

  const gap = 2;

  return(
    <div ref={parentRefs} className='relative'>
      <div className={`grid grid-cols-1 gap-1.5 my-2 mx-1`}>
        <div id='first-col' className={`grid grid-cols-4 gap-${gap}`}> 
          {/** C초기화*/}
          <button onClick={ () => handleResetClicked(true) } style={{height: `${buttonWidths}px`}} ref={buttonRefs} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 text-red-400 rounded-full'>C</button>
          {/** ( 괄호 */}
          <button onClick={ () => handleBracketClicked("(") } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><img src={`${images.Lbracket}`} width={'25px'} /></button>
          {/** ) 괄호  */}
          <button onClick={ () => handleBracketClicked(")") } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><img src={`${images.Rbracket}`} width={'27px'} /></button>
          {/** / 나누기 */}
          <button onClick={ () => handleMoreClicked('/') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><img src={`${images.divide}`} width={'28px'} /></button>
        </div>
        <div id='second-col' className={`grid grid-cols-4 gap-${gap}`}> 
          {/** 7 숫자 */}
          <button onClick={ () => handleNumClicked('7') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>7</button>
          {/** 8 숫자 */}
          <button onClick={ () => handleNumClicked('8') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>8</button>
          {/** 9 숫자 */}
          <button onClick={ () => handleNumClicked('9') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>9</button>
          {/** * 곱하기 */}
          <button onClick={ () => handleMoreClicked('*') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><img src={`${images.multiple}`} width={'20px'} /></button>
        </div>
        <div id='third-col' className={`grid grid-cols-4 gap-${gap}`}> 
          {/** 4 숫자 */}
          <button onClick={ () => handleNumClicked('4') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>4</button>
          {/** 5 숫자 */}
          <button onClick={ () => handleNumClicked('5') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>5</button>
          {/** 6 숫자 */}
          <button onClick={ () => handleNumClicked('6') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>6</button>
          {/** - 빼기 */}
          <button onClick={ () => handleMoreClicked('-') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><img src={`${images.minus}`} width={'25px'} /></button>
        </div>
        <div id='forth-col' className={`grid grid-cols-4 gap-${gap}`}> 
          {/** 1 숫자 */}
          <button onClick={ () => handleNumClicked('1') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>1</button>
          {/** 2 숫자 */}
          <button onClick={ () => handleNumClicked('2') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>2</button>
          {/** 3 숫자 */}
          <button onClick={ () => handleNumClicked('3') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>3</button>
          {/** + 더하기 */}
          <button onClick={ () => handleMoreClicked('+') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-neutral-500 rounded-full text-green-600'><img src={`${images.plus}`} width={'25px'} /></button>
        </div>
        <div id='fifth-col' className={`grid grid-cols-4 gap-${gap}`}> 
          {/** +/- 플마 */}
          <button onClick={ () => handlePlusMinusClicked() } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-2xl max-w-20 bg-slate-800 text-white rounded-full'>+/-</button>
          {/** 0 숫자 */}
          <button onClick={ () => handleNumClicked('0') } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>0</button>
          {/** . 소숫점 */}
          <button onClick={ () => handleNumClicked(".") } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-slate-800 text-white rounded-full'>.</button>
          {/** = 등호 */}
          <button onClick={ () => handleEqualClicked() } style={{height: `${buttonWidths}px`}} className='font-bold flex justify-center items-center text-3xl max-w-20 bg-green-500 text-white rounded-full'><img src={`${images.equal}`} width={'25px'} /></button>
        </div>
      </div>
      
      <div id='popup' className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${popup ? 'opacity-100' : 'opacity-0'}`}>
        {showPopup ? <Popup msg={msg} parentWidths={parentWidths} isBright={false}></Popup> : ''}
        {/* {<Popup msg={'완성되지 않은 수식입니다.'} parentWidths={parentWidths}></Popup>} */}
      </div>
    </div>
  )
}