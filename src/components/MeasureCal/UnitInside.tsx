import { useEffect, useRef, useState } from "react";
import type { UpDownCompType, Tip } from "../../shared/type/UnitType";
import { isTip, isUpDownCompType } from "../../shared/type/UnitType";
import images from "../../style/image";
import UnitPopup from "../assets/UnitPopup";
import { measureStore } from "../../shared/stateStore/measurestore";

export default function UnitInside({ select, setIdx, topdown, contentIdx, Top }: { select: UpDownCompType | Tip, setIdx: (s: boolean, idx: number) => void, topdown: boolean, contentIdx?: number, Top?: boolean }) {
  const SupText = ({ base, sup }: { base: string, sup: number | string }) => (
    <span>
      {base}<sup>{sup}</sup>
    </span>
  )

  const isExpo = () => {
    if ((select as UpDownCompType).Content.length <= (contentIdx as number)) return '';
    if (isUpDownCompType(select) && typeof contentIdx === 'number' && select.Content[contentIdx].expo) {
      return select.Content[contentIdx].expo;
    } else {
      return '';
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  const input = measureStore((state) => state.input);
  const result = measureStore((state) => state.result);
  const show = measureStore((state) => state.show);

  const isZero = () => {
    if(show) {
      if (topdown) {
        return input;
      } else {
        return result;
      }
    } else {
      return ''
    }
  }

  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const unsubscribe = measureStore.subscribe(
      state => state.result,
      (result) => {
        if(h1Ref.current !== null && !topdown && show) {
          h1Ref.current.innerHTML = result.toString();
        }
      }
    );

    return unsubscribe;
  }, [])

  if (typeof contentIdx === 'number' && isUpDownCompType(select)) {
    return (
      <div className="w-full flex flex-col justify-between px-3 h-24 relative">
        <div onClick={togglePopup} id="Unit-Content" className="flex justify-normal flex-row align-middle items-center relative z-10">
          <h1 className="text-white flex flex-row pr-2 pt-1 z-20">{select.Content.length <= contentIdx ? select.Content[contentIdx % select.Content.length].signName : select.Content[contentIdx].signName}</h1>
          <img src={images.DownTri} style={{ width: '13px', height: '10px' }} />
        </div>

        {showPopup && (
          <div className="absolute z-50">
            <UnitPopup onClose={closePopup} select={select} selectedIdx={contentIdx} setIdx={setIdx} topdown={topdown}></UnitPopup>
          </div>
        )}

        <div id="Unit-Value" className="flex justify-end relative">
          <h1 ref={h1Ref} className="text-white text-2xl absolute right-10 bottom-1"> {isZero()} </h1>
          <h1 className="text-white text-xl absolute right-0 bottom-0">
            <SupText base={select.Content.length <= contentIdx ? select.Content[contentIdx % select.Content.length].sign : select.Content[contentIdx].sign} sup={isExpo()} />
          </h1>
        </div>
      </div>
    )
  } else if (isTip(select)) {
    if (Top) {
      return (
        <div className="w-full flex flex-col justify-between px-3 h-24">
          <div id="consume" className="w-full flex justify-between items-center">
            <h1 className="text-white flex flex-row pr-2 pt-1">{select.Top}</h1>
            <p className="text-white flex flex-row pr-2 pt-1 text-sm">number</p>
          </div>
          <div className="w-full flex justify-between">
            <button className="text-white">난 버튼</button>
            <div className="text-white flex flex-col justify-end text-right">
              <h1 className="text-lg">난 금액 값</h1>
              <p className="text-xs">팁 금액</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="w-full flex flex-col justify-between px-3 h-24">
          <div id="total" className="w-full flex justify-between items-center">
            <h1 className="text-white flex flex-row pr-2 pt-1">{select.Down}</h1>
            <p className="text-white flex flex-row pr-2 pt-1 text-sm">가격</p>
          </div>
          <div className="w-full flex justify-between">
            <button className="text-white">나도 버튼</button>
            <div className="text-white flex flex-col justify-end text-right">
              <h1 className="text-lg">난 인당 값</h1>
              <p className="text-xs">인당</p>
            </div>
          </div>
        </div>
      )
    }
  }

  return null;
}