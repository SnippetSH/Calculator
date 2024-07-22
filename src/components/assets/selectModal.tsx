import { useState, useRef, useEffect } from "react";
import { DivideStore, modalStore, TipStore } from "../../shared/stateStore/measurestore";

export default function SelectModal() {

  const numbers = Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, '0'));
  const listRef = useRef<HTMLUListElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = listRef.current;
        const itemHeight = scrollHeight / numbers.length;
        const middleOfContainer = scrollTop + clientHeight / 2;
        const newIndex = Math.round(middleOfContainer / itemHeight) - 1;
        setSelectedIndex(newIndex);
      }
    };

    (listRef.current as HTMLElement).addEventListener('scroll', handleScroll);

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [numbers]);

  const popupRef = useRef<HTMLDivElement>(null);
  const setHide = modalStore((state) => state.setHide);
  const show = modalStore((state) => state.show);

  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setHide();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    }
  })

  const setTip = TipStore((state) => state.setTip);
  const setDivide = DivideStore((s) => s.setDivide);

  const completeClicked = () => {
    if(show === "팁") {
      setTip(Number(numbers[selectedIndex]));
    } else {
      setDivide(Number(numbers[selectedIndex]));
    }
    setHide();
  }

  return (
    <div ref={popupRef} className="w-full bg-gray-500 rounded-2xl text-white">
      <p className="py-3 px-4">{show}</p>
      <div className="flex items-center">
        <div className="flex justify-center pl-16 w-1/2 h-28 relative">
          <ul
            ref={listRef}
            className="flex flex-col overflow-y-auto h-full"
            style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
          >
            {numbers.map((number, index) => (
              <li
                key={index}
                className={`text-3xl py-1 ${index === selectedIndex ? 'text-white' : 'text-gray-600'}`}
                style={{
                  scrollSnapAlign: 'center',
                  opacity: index === selectedIndex ? 1 : 0.5,
                  transform: index === selectedIndex ? 'scale(1)' : 'scale(0.8)',
                  transition: 'transform 0.2s, opacity 0.2s'
                }}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center pl-7 w-1/2 font-bold text-xl"><p>{show === "나누기" ? "사람" : "%"}</p></div>
      </div>

      <div className="my-2 flex items-center font-bold">
        <h1 onClick={setHide} className="w-1/2 text-center pl-5 m-2 border-r-2 border-r-white/25">취소</h1>
        <h1 onClick={completeClicked} className="w-1/2 text-center pr-5 m-2">완료</h1>
      </div>
    </div>
  )
} 