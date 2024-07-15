import './App.css'
import images from './assets/image'
import CalPart from './Components/CalPart';
import { numberStore, operatorStore, numIdxStore } from './store/store';
import { resultStore } from './store/result';
import type { ArrayNum } from './store/type/type';

function App() {
  const num = numberStore((state) => state.num);
  const operator = operatorStore((state) => state.operator);
  const removeOperator = operatorStore((state) => state.removeOperator);
  const currentLength = numberStore((state) => state.currentLength);
  const removeCurLen = numberStore((state) => state.removeCurLen);
  const remove = numberStore((state) => state.remove);
  const numIdx = numIdxStore((state) => state.numIdx);
  const setNumIdx = numIdxStore((state) => state.setNumIdx);

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
      }
    }
  }

  const result = resultStore((state) => state.result);
  const setResult = resultStore((state) => state.setResult);

  const handleResult = (): number => {
    let r = 0;
    setResult(num, operator);
    r = result;
    return r
  }

  const size = '50px';
  return (
    <div>
      <div className='flex items-center justify-center h-screen flex-col'>
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
        <div id='top' className='w-1/4' style={{maxWidth: '400px'}}>
          <div id='equation-And-result' className='h-48 bg-stone-950 relative flex flex-col items-end justify-center'>
            <div id='equation'>
                <span className='text-white'>
                  {
                    num.map((arr, idx) => {
                      const output:  (ArrayNum|string)[] = [];
                      if(idx !== num.length) {
                        output.push(arr);
                        output.push(operator[idx]);
                      } else {
                        output.push(arr);
                      }
                      return output
                    }) 
                  }
                </span>
            </div>
            <div id='result' className=''>
                <span className='text-gray-500'>
                  { currentLength[numIdx] === 0 ? '' :
                    numIdx !== 0 ? handleResult() : '' 
                  }
                </span>
            </div>
          </div>

          <div id='buttons' className='bg-stone-950 relative flex items-center border-b-2 border-gray-500 justify-between'>
            <div className='flex'>
              <button> <img src={images.recent} width={size} height={size}></img> </button>
              <button> <img src={images.ruler} width={size} height={size}></img> </button>
              <button> <img src={images.more} width={size} height={size}></img> </button>
            </div>
            <button onClick={ () => handleRemoveClicked() }> <img src={images.remove} width={size} height={size} className='brightness-200'></img> </button>
          </div>
        </div>

        <div id='down-cal' className='h-auto bg-stone-950 w-1/4' style={{maxWidth: '400px'}}>
          <div id='Cal-part' className=''>
            <CalPart></CalPart>
          </div>
        </div>
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
