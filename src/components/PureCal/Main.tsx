import { equationStore } from "../../shared/stateStore/store";
import { resultStore } from "../../shared/stateStore/result";
import { bracketStore } from "../../shared/stateStore/bracket";
import { useState, useEffect } from "react";
import { evalPostfix, infixToPostfix } from "../../shared/api/Calapi";
import CalPart from "./CalPart";
import HistoryPart from "./HistoryPart";
import images from "../../style/image";
import Print from "../assets/Print";

export default function Main() {
  const curEqu = equationStore((state) => state.cur);
  const popEqu = equationStore((state) => state.pop);
  const pushEqu = equationStore((state) => state.push);
  const setBracket = bracketStore((state) => state.setBracket);
  const bracketNum = bracketStore((state) => state.bracketNum);
  let [isBlank, setIsBlank] = useState(false);

  const handleRemoveClicked = () => {
    if (curEqu[curEqu.length - 1] === "(") {
      setBracket(false);
    }
    if (curEqu[curEqu.length - 1] === ")") {
      setBracket(true);
    }

    if (!isNaN(Number(curEqu[curEqu.length - 1]))) {
      let tmp = curEqu[curEqu.length - 1]
      popEqu(1);
      tmp = tmp.slice(0, -1);
      if (tmp.length === 0) { return; }
      pushEqu(tmp);
      return;
    }

    popEqu(1);
    setIsBlank(true);
  }

  useEffect(() => {
    if (curEqu.length === 0) {
      resultStore.getState().reset();
    }

    setIsBlank(false);
  }, [isBlank]);


  const result = resultStore((state) => state.result);
  const setResult = resultStore((state) => state.setResult);
  const showResult = resultStore((state) => state.showResult);

  const [infix, setInfix] = useState<string[]>([]);

  const CanIShowResult = (): number | string => {
    if (showResult) { return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); }
    if (infix.includes("+") || infix.includes("-") || infix.includes("*") || infix.includes("/")) {
      if (bracketNum === 0) {
        if ((!isNaN(Number(curEqu[curEqu.length - 1])) || curEqu[curEqu.length - 1] === ")") && curEqu.length > 1) {
          return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        } else {
          return '';
        }
      } else {
        return '';
      }
    } else { return ''; }
  }

  useEffect(() => {
    if (bracketNum === 0) {
      const tmp: string[] = [];
      curEqu.forEach((context) => {
        if (!isNaN(Number(context))) {
          tmp.push(Number(context).toString());
        } else {
          tmp.push(context);
        }
      });
      setInfix(tmp);
    }
  }, [curEqu, bracketNum]);

  const [resultLen, setResultLen] = useState(0);
  useEffect(() => {
    console.log(infix);
    if (infix.includes("+") || infix.includes("-") || infix.includes("*") || infix.includes("/")) {
      if (infix.length > 2 && (infix[infix.length - 1] === ")" || !isNaN(Number(infix[infix.length - 1])))) {
        const postfix = infixToPostfix(infix);
        const result = evalPostfix(postfix);
        setResult(result);
        setResultLen(result.toString().length);
      }
    }
  }, [infix, curEqu]);

  const [showHistory, setShowHistory] = useState(false);

  const size = '50px';
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      {/** 테스트 코드 */}

      <div id='top' className='w-1/6' style={{ maxWidth: '400px', maxHeight: '430px', minWidth: '300px' }}>
        <div id='equation-And-result' className='h-36 bg-stone-950 relative flex flex-col items-end justify-center overflow-hidden'>
          <div id='equation' className='px-4 pt-8 h-1/2 overflow-y-hidden'>
            <Print></Print>
          </div>
          <div id='result' className='px-4 pt-4 h-1/2'>
            <span className={`${showResult ? resultLen > 15 ? 'text-green-500 text-2xl' : 'text-green-500 text-3xl' : 'text-gray-500 text-lg'}`}>
              {CanIShowResult()}
            </span>
          </div>
        </div>

        <div id='buttons' className='bg-stone-950 relative flex items-center border-b-2 border-gray-500 justify-between px-1'>
          <div className='flex'>
            <button onClick={() => setShowHistory(!showHistory)}> <img src={images.history} width={size} height={size}></img> </button>
            <button> <img src={images.ruler} width={size} height={size}></img> </button>
            <button> <img src={images.more} width={size} height={size}></img> </button>
          </div>
          <button onClick={() => handleRemoveClicked()}> <img src={images.remove} width={size} height={size} className='brightness-200'></img> </button>
        </div>
      </div>

      <div id='down-cal' className='relative h-auto bg-stone-950 w-1/6' style={{ maxWidth: '400px', minWidth: '300px' }}>

        {showHistory && <HistoryPart setShow={setShowHistory}></HistoryPart>}
        <CalPart></CalPart>

      </div>
      {/** 테스트 코드 */}

    </div>
  )
}