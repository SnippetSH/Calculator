import { useEffect, useState } from "react"
import { Unit, tip } from "../../shared/type/UnitType"
import { measureStore, topBottomStore } from "../../shared/stateStore/measurestore";
import UnitInside from "./UnitInside"

export default function UnitComp({ renderIdx}: { renderIdx: number}) {

    const [contentFIdx, setContentFIdx] = useState(1);
    const [contentSIdx, setContentSIdx] = useState(2);

    /** 첫번째 인자: 윗부분 or 아랫부분 선택 boolean, 두번째 인자: idx number */
    const setOneIdx = (s: boolean, idx: number) => {
        if (s) {
            setContentFIdx(idx);
        } else {
            setContentSIdx(idx);
        }
        measureStore.getState().reset();
    }

    const isTop = topBottomStore((state) => state.selectISTop);
    const measure = measureStore((state) => state.setResult);
    useEffect(() => {
        if(renderIdx < 8) {
            const unsubscribe = measureStore.subscribe(
                state => state.input,
                () => {
                    console.log("꾸아앙아아")
                    let 하나 = contentFIdx, 둘 = contentSIdx;
                    const select = Unit[renderIdx].Content;
                    console.log(하나, 둘);
                    //console.log(select.length);
                    if(select.length <= contentFIdx || select.length <= contentSIdx) {
                        하나 = 하나 % select.length;
                        둘 = 둘 % select.length;
                    }
                    console.log(하나, 둘);
                    if(isTop) {
                        measure(renderIdx, select[하나].signName, select[둘].signName);
                    } else {
                        measure(renderIdx, select[둘].signName, select[하나].signName);
                    }
                }
            );
            return unsubscribe;
        }
    }, [renderIdx, contentFIdx, contentSIdx])

    if (renderIdx < 8) {
        return (
            <div className="w-full">
                <UnitInside Top={true} select={Unit[renderIdx]} contentIdx={contentFIdx} setIdx={setOneIdx} topdown={isTop}></UnitInside>
                <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
                <UnitInside Top={false} select={Unit[renderIdx]} contentIdx={contentSIdx} setIdx={setOneIdx} topdown={!isTop}></UnitInside>
                <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
            </div>
        )
    } else {
        return (
            <div className="w-full">
                <UnitInside select={tip} Top={true} setIdx={setOneIdx} topdown={true}></UnitInside>
                <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
                <UnitInside select={tip} Top={false} setIdx={setOneIdx} topdown={false}></UnitInside>
                <div className="border-b-2 border-b-gray-400 border-opacity-30 rounded-sm mx-2"></div>
            </div>
        )
    }
}