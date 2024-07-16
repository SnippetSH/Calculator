import './App.css'
import images from './assets/image'
import CalPart from './Components/CalPart';
import { numberStore, operatorStore, numIdxStore } from './store/store';
import { resultStore } from './store/result';
import { useEffect, useState } from 'react';
import Print from './Components/assets/Print';

function App() {
  const num = numberStore((state) => state.num);
  const operator = operatorStore((state) => state.operator);
  const removeOperator = operatorStore((state) => state.removeOperator);
  const currentLength = numberStore((state) => state.currentLength);
  const removeCurLen = numberStore((state) => state.removeCurLen);
  const remove = numberStore((state) => state.remove);
  const numIdx = numIdxStore((state) => state.numIdx);
  const setNumIdx = numIdxStore((state) => state.setNumIdx);

  let [isBlank, setIsBlank] = useState(false);
  const handleRemoveClicked = () => {
    if(numIdx !== 0 || currentLength[numIdx]) {
      if((currentLength[numIdx] === undefined || currentLength[numIdx] === 0)) {
        setNumIdx(false);
        removeOperator();
        if(currentLength[numIdx] === 0) {
          removeCurLen();
        }
      } else {
        remove(numIdx);
        setIsBlank(true);
      }
    }
  }

  useEffect(() => {
    if(currentLength.length === 0) {
      resultStore.getState().reset();
    }

    setIsBlank(false);
  }, [isBlank]);


  const result = resultStore((state) => state.result);
  const showResult = resultStore((state) => state.showResult);
  const setResult = resultStore((state) => state.setResult);

  const handleResult = () => {
    if(numIdx !== 0 && currentLength[numIdx] !== 0) {
      setResult(num, operator);
    }
  }

  useEffect(() => {
    handleResult();
  }, [num])

  const CanIShowResult = (): number|string => {
    if(result !== 0 && currentLength[numIdx] !== 0) {
      return result;
    } else {
      return '';
    }
  }

  const size = '50px';
  return (
    <div>
      <div className='flex items-center justify-center h-screen flex-col'>
        {/** 테스트 코드 */}
        {/* <div>
          {
            num.map((arr, idx) => {
              return <div key={idx}> { arr } </div>
            })
          }
        </div>
        <div>
          {currentLength}
        </div> */}
        <div id='top' className='w-1/6' style={{maxWidth: '400px', maxHeight: '240px', minWidth: '180px'}}>
          <div id='equation-And-result' className='h-36 bg-stone-950 relative flex flex-col items-end justify-center'>
            <div id='equation' className='px-4'>
              <Print></Print>
            </div>
            <div id='result' className='px-4'>
                <span className={`${showResult ? 'text-green-500 text-xl' : 'text-gray-500 text-lg'}`}>
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
        {/* {
          operator
        }
        {
          numIdx
        } */}
      </div>
    </div>
  )
}

export default App
