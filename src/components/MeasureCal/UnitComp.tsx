import { Unit, tip } from "../../shared/type/UnitType"
import UnitInside from "./UnitInside"

export default function UnitComp({renderIdx}: {renderIdx: number}) {
    if(renderIdx < 8) {
        return (
            <div className="w-full">
                <UnitInside select={Unit[renderIdx]} contentIdx={1}></UnitInside>
                <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
                <UnitInside select={Unit[renderIdx]} contentIdx={2}></UnitInside>
                <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
            </div>
        )
    } else {
        return (
            <div className="w-full">
                <UnitInside select={tip} Top={true}></UnitInside>
                <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
                <UnitInside select={tip} Top={false}></UnitInside>
                <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
            </div>
        )
    }
}