import { useEffect, useRef } from "react";
import { UpDownCompType } from "../../shared/type/UnitType";

export default function UnitPopup({ select, onClose, selectedIdx, setIdx, topdown }: { select: UpDownCompType, onClose: () => void, selectedIdx: number, setIdx: (s: boolean, idx: number) => void, topdown: boolean }) {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    }
  })

  const clickHandle = (idx: number) => {
    setIdx(topdown, idx);
    onClose();
  }

  return (
    <div ref={popupRef} className="bg-gray-600 rounded-lg overflow-hidden relative" style={{ zIndex: "1000" }}>
      <ul className="p-3 flex flex-col align-middle overflow-y-auto">
        {
          select.Content.map((con, idx) => {
            if (idx === selectedIdx) {
              return (
                <li onClick={() => clickHandle(idx)} key={"unit" + idx} className="py-1 text-base text-green-400">
                  <span>
                  {`${con.signName} (${con.sign}`}
                  <sup>{con.expo ? con.expo : ''}</sup>
                  )
                </span>
                </li>
              )
            }
            return (
              <li onClick={() => clickHandle(idx)} key={"unit" + idx} className="py-1 text-base text-white">{
                <span>
                  {`${con.signName} (${con.sign}`}
                  <sup>{con.expo ? con.expo : ''}</sup>
                  )
                </span>
              }</li>
            )
          })
        }
      </ul>
    </div>
  )
}