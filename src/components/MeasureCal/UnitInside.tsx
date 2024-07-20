import type { UpDownCompType, Tip } from "../../shared/type/UnitType";
import { isTip, isUpDownCompType } from "../../shared/type/UnitType";
import images from "../../style/image";

export default function UnitInside({ select, contentIdx, Top }: { select: UpDownCompType | Tip, contentIdx?: number, Top?: boolean }) {
  const SupText = ({ base, sup }: {base: string, sup: number | string} ) => (
    <span>
      {base}<sup>{sup}</sup>
    </span>
  )

  const isExpo = () => {
    if (isUpDownCompType(select) && typeof contentIdx === 'number' && select.Content[contentIdx].expo) {
      return select.Content[contentIdx].expo;
    } else {
      return '';
    }
  };

  if(typeof contentIdx === 'number' && isUpDownCompType(select)) {
    console.log(contentIdx);
    return (
      <div className="w-full flex flex-col justify-between px-3 h-24">
        <div id="Unit-Content" className="flex justify-normal flex-row align-middle items-center">
          <h1 className="text-white flex flex-row pr-2 pt-1">{select.Content[contentIdx].signName}</h1>
          <img src={images.DownTri} style={{ width: '13px', height: '10px' }} />
        </div>
        <div id="Unit-Value" className="flex justify-end">
          <h1 className="text-white text-xl">
            <SupText base={select.Content[contentIdx].sign} sup={isExpo()}/>
          </h1>
        </div>
      </div>
    )
  } else if(isTip(select)){
    console.log("hio");
    if(Top) {
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