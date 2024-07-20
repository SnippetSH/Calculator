import type { UpDownCompType } from "../../shared/type/UnitType";
import images from "../../style/image";

export default function UnitInside({ select, contentIdx }: { select: UpDownCompType, contentIdx: number }) {
  const SupText = ({ base, sup }: {base: string, sup: number | string} ) => (
    <span>
      {base}<sup>{sup}</sup>
    </span>
  )

  const isExpo = () => {
    if(select.Content) {
      if(select.Content[contentIdx].expo) {
        return select.Content[contentIdx].expo;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  //const F = 0, S = 1;

  return (
    <div className="w-full flex flex-col justify-between px-3">
      <div id="Unit-Content" className="flex justify-normal flex-row align-middle items-center">
        <h1 className="text-white flex flex-row pr-2">{select.Content[contentIdx].signName}</h1>
        <img src={images.DownTri} style={{ width: '13px', height: '10px' }} />
      </div>
      <div id="Unit-Value" className="flex justify-end">
        <h1 className="text-white">
          
          <SupText base={select.Content[contentIdx].sign} sup={isExpo()}/>

        </h1>
      </div>
    </div>
  )
}