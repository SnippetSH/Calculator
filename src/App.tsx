import './App.css';
import images from './style/image';
import CalPart from './components/CalPart';
import Print from './components/assets/Print';
import { equationStore } from './shared/stateStore/store';
import { resultStore } from './shared/stateStore/result';
import { bracketStore } from './shared/stateStore/bracket';
import { evalPostfix, infixToPostfix } from './shared/api/Calapi';
import { useEffect, useState } from 'react';

function App() {
  const curEqu = equationStore((state) => state.cur);
  const popEqu = equationStore((state) => state.pop);
  const pushEqu = equationStore((state) => state.push);
  const setBracket = bracketStore((state) => state.setBracket);
  const bracketNum = bracketStore((state) => state.bracketNum);
  let [isBlank, setIsBlank] = useState(false);

  const handleRemoveClicked = () => {
    if(curEqu[curEqu.length-1] === "(") {
      setBracket(false);
    }
    if(curEqu[curEqu.length-1] === ")") {
      setBracket(true);
    }
    if(!isNaN(Number(curEqu[curEqu.length-1]))) {
      let tmp = curEqu[curEqu.length - 1]
      popEqu(1);
      tmp = tmp.slice(0, -1);
      pushEqu(tmp);
      return;
    }
    popEqu(1);
    setIsBlank(true);
  }

  useEffect(() => {
    if(curEqu.length === 0) {
      resultStore.getState().reset();
    }

    setIsBlank(false);
  }, [isBlank]);


  const result = resultStore((state) => state.result);
  const setResult = resultStore((state) => state.setResult);
  const showResult = resultStore((state) => state.showResult);

  const [infix, setInfix] = useState<string[]>([]);
  const CanIShowResult = (): number|string => {
    if(showResult) {return result;}
    if(infix.includes("+") || infix.includes("-") || infix.includes("*") || infix.includes("/")) {
      if(bracketNum === 0) {
        if((!isNaN(Number(curEqu[curEqu.length - 1])) || curEqu[curEqu.length - 1] === ")") && curEqu.length > 1) {
          return result;
        } else {
          return '';
        }
      } else {
        return '';
      }
    } else { return '';}
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

  useEffect(() => {
    if(infix.includes("+") || infix.includes("-") || infix.includes("*") || infix.includes("/")) {
      if (infix.length > 2 && (infix[infix.length - 1] === ")" || !isNaN(Number(infix[infix.length - 1])))) {
        const postfix = infixToPostfix(infix);
        const result = evalPostfix(postfix);
        setResult(result);
      }
    }
  }, [infix, curEqu]);

  const size = '50px';
  return (
    <div>
      <div className='flex items-center justify-center h-screen flex-col'>
        {/** 테스트 코드 */}
        
        <div id='top' className='w-1/6' style={{maxWidth: '400px', maxHeight: '240px', minWidth: '180px'}}>
          <div id='equation-And-result' className='h-36 bg-stone-950 relative flex flex-col items-end justify-center'>
            <div id='equation' className='px-4 pt-8 h-1/2'>
              <Print></Print>
            </div>
            <div id='result' className='px-4 pt-4 h-1/2'>
                <span className={`${showResult ? 'text-green-500 text-3xl' : 'text-gray-500 text-lg'}`}>
                  {CanIShowResult()}
                </span>
            </div>
          </div>

          <div id='buttons' className='bg-stone-950 relative flex items-center border-b-2 border-gray-500 justify-between px-1'>
            <div className='flex'>
              <button> <img src={images.recent} width={size} height={size}></img> </button>
              <button> <img src={images.ruler} width={size} height={size}></img> </button>
              <button> <img src={images.more} width={size} height={size}></img> </button>
            </div>
            <button onClick={ () => handleRemoveClicked() }> <img src={images.remove} width={size} height={size} className='brightness-200'></img> </button>
          </div>
        </div>

        <div id='down-cal' className='h-auto bg-stone-950 w-1/6' style={{maxWidth: '400px', minWidth: '180px'}}>
          <div id='Cal-part' className=''>
            <CalPart></CalPart>
          </div>
        </div>
        {/** 테스트 코드 */}
        
      </div>
    </div>
  )
}

export default App
