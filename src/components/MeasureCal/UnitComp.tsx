import { Unit } from "../../shared/type/UnitType"
import UnitInside from "./UnitInside"

export default function UnitComp({renderIdx}: {renderIdx: number}) {
    return (
        <div className="w-full">
            <UnitInside select={Unit[renderIdx]} contentIdx={0}></UnitInside>
            <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
            <UnitInside select={Unit[renderIdx]} contentIdx={1}></UnitInside>
        </div>
    )
}