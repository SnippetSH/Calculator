import { useEffect, useRef, useState } from "react";
import type { UpDownCompType, Tip } from "../../shared/type/UnitType";
import { isTip, isUpDownCompType } from "../../shared/type/UnitType";
import images from "../../style/image";
import UnitPopup from "../assets/UnitPopup";
import { DivideStore, measureStore, modalStore, TipStore } from "../../shared/stateStore/measurestore";
import { roundToPrecision } from "../../shared/api/Calapi";

export default function UnitInside({ Top, select, setIdx, topdown, contentIdx }: { select: UpDownCompType | Tip, setIdx: (s: boolean, idx: number) => void, topdown: boolean, contentIdx?: number, Top: boolean }) {
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
  const tip = TipStore((s) => s.tip);
  const divide = DivideStore((s) => s.divide);


  const isZero = () => {

    if (show) {
      if (topdown) {
        return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
        console.log("아잉");
        if (h1Ref.current !== null && !topdown && show) {
          h1Ref.current.innerHTML = result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    );

    return unsubscribe;
  }, [])

  const setShow = modalStore((state) => state.setShow);
  const tipsAndDive = (x: "팁" | "나누기") => {
    setShow(x);
  }

  if (typeof contentIdx === 'number' && isUpDownCompType(select)) {
    return (
      <div className="w-full flex flex-col py-1 justify-between px-3 h-28 relative">
        <div onClick={togglePopup} id="Unit-Content" className="flex justify-normal flex-row align-middle items-center relative z-10">
          <h1 className="text-white flex flex-row pr-2 pt-1 z-20">{select.Content.length <= contentIdx ? select.Content[contentIdx % select.Content.length].signName : select.Content[contentIdx].signName}</h1>
          <img src={images.DownTri} style={{ width: '13px', height: '10px' }} />
        </div>

        {showPopup && (
          <div className="absolute z-50">
            <UnitPopup onClose={closePopup} select={select} selectedIdx={contentIdx} setIdx={setIdx} topdown={Top}></UnitPopup>
          </div>
        )}

        <div id="Unit-Value" className="flex justify-end relative">
          <h1 ref={h1Ref} className="text-white text-2xl absolute right-12 bottom-1"> {isZero()} </h1>
          <h1 className="text-white text-xl absolute right-0 bottom-0">
            <SupText base={select.Content.length <= contentIdx ? select.Content[contentIdx % select.Content.length].sign : select.Content[contentIdx].sign} sup={isExpo()} />
          </h1>
        </div>
      </div>
    )
  } else if (isTip(select)) {
    if (Top) {
      return (
        <div className="w-full flex flex-col justify-between py-1 px-3 h-28">
          <div id="consume" className="w-full flex justify-between items-center">
            <h1 className="text-white flex flex-row pr-2 pt-1">{select.Top}</h1>
            <p className="text-white flex flex-row pr-2 pt-1 text-base">{show ? input : ''}</p>
          </div>
          <div className="w-full flex justify-end items-center relative">
            <button onClick={() => tipsAndDive("팁")} className="absolute bottom-0 left-0 text-white px-3 h-7 rounded-full bg-gray-500 bg-opacity-75 flex items-center"> <img className="brightness-125" src={images.tips} width={'25px'} /> <span className="pl-0.5">{tip}%</span> </button>
            <div className="text-white flex flex-col justify-end text-right">
              <h1 className="text-2xl">{show ? roundToPrecision(input * (tip / 100), 2) : ''}</h1>
              <p className="text-xs">팁 금액</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="w-full flex flex-col justify-between py-1 px-3 h-28">
          <div id="total" className="w-full flex justify-between items-center">
            <h1 className="text-white flex flex-row pr-2 pt-1">{select.Down}</h1>
            <p className="text-white flex flex-row pr-2 pt-1 text-base">{show ? input + (input * (tip / 100)) : ''}</p>
          </div>
          <div className="w-full flex justify-end items-center relative">
            <button onClick={() => tipsAndDive("나누기")} className="absolute bottom-0 left-0 text-white px-3 h-7 rounded-full bg-gray-500 bg-opacity-75 flex items-center"> <img className="brightness-125" src={images.humans} width={'25px'} /> <span className="pl-0.5">{divide}</span></button>
            <div className="text-white flex flex-col justify-end text-right">
              <h1 className="text-2xl">{show ? roundToPrecision((input + (input * (tip / 100))) / divide, 2) : ''}</h1>
              <p className="text-xs">인당</p>
            </div>
          </div>
        </div>
      )
    }
  }

  return null;
}