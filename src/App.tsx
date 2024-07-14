import './App.css'
import images from './assets/image'
import CalPart from './Components/CalPart';

function App() {
  const size = '50px';
  return (
    <div>
      <div className='flex items-center justify-center h-screen flex-col'>
        <div id='top-result' className='w-1/4'>
          <div id='result' className='h-32 bg-stone-950 relative flex items-center justify-end'>
            <span className=''>hi</span>
          </div>
          <div id='buttons' className=''>
            <button> <img src={images.recent} width={size} height={size}></img> </button>
            <button> <img src={images.ruler} width={size} height={size}></img> </button>
            <button> <img src={images.more} width={size} height={size}></img> </button>
            <button> <img src={images.remove} width={size} height={size}></img> </button>
          </div>
        </div>

        <div id='down-cal' className='h-auto bg-stone-950 w-1/4'>
          <div id='Cal-part' className=''>
            <CalPart></CalPart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
