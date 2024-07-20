import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { InitStorage } from './shared/api/localDBapi';
import { useEffect } from 'react';
import Main from './components/PureCal/Main';
import MeasureMain from './components/MeasureCal/MeasureMain';


function App() {
  //App 컴포넌트가 마운트 될 때 로컬 스토리지 확인
  useEffect(() => {
    if(!localStorage.getItem('history')) {
      InitStorage();
    }
  }, [])


  return (
    <div className='bg-white'>
      <BrowserRouter basename='/Calculator'>
        <Routes>
          <Route path="/Calculator" element={<Main/>} />
          <Route path="/Calculator/measure" element={<MeasureMain/>} />
          <Route path="*" element={<Navigate to="/Calculator" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
