import { useEffect, useRef, useState } from "react";
import { InitStorage, loadAllData, loadOneData } from "../../shared/api/localDBapi";
import { HistoryStorage } from "../../shared/type/type";
import { equationStore } from "../../shared/stateStore/store";
import { resultStore } from "../../shared/stateStore/result";
import Popup from "../assets/Popup";
import { handleNumClickedfunc } from "../../shared/api/handleNumClicked";

export default function HistoryPart({ setShow } : {setShow: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [Data, setData] = useState<HistoryStorage[]>();

    const parentRefs = useRef<HTMLDivElement>(null);
    const [parentWidths, setParentWidths] = useState(0);

    useEffect(() => {
        setData(loadAllData());
        if(parentRefs.current) {
            setParentWidths(parentRefs.current.offsetWidth)
        }

        const handleResize = () => {
            if(parentRefs.current) {
              setParentWidths(parentRefs.current.offsetWidth)
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        }
    }, []); //컴포넌트 마운트 시 Data 불러오기 and 현재 전체 div박스 width 불러오기

    const ulRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if(ulRef.current) {
            ulRef.current.scrollTop = ulRef.current.scrollHeight;
        }
    }, [Data]) //

    const reRenderAndDel = () => {
        setShow(false);
        InitStorage();
    }

    const reverseData = () => {
        return Data ? [...Data].reverse() : [];
    }

    const setEqu = equationStore((state) => state.setEqu);
    const curEqu = equationStore((state) => state.cur);
    const pushEqu = equationStore((state) => state.push);
    const popEqu = equationStore((state) => state.pop);
    const setShowResult = resultStore((state) => state.setShowResult);
    const showResult = resultStore((state) => state.showResult);
    

    const handleEquClicked = (idx: number) => {
        setShow(false);
        const tmp = loadOneData(idx);
        setEqu(tmp.equation);
    }

    const handleResClicked = (idx: number) => {
        const tmp = loadOneData(idx);
        handleNumClickedfunc(tmp.result ? tmp.result.toString() : '', curEqu, pushEqu, popEqu, showResult, setShowResult);
    }

    return (
        <div ref={parentRefs} id="History" className="absolute top-0 left-0 bg-black w-3/4 h-full z-20 border-r-2 border-gray-600 overflow-hidden" >
            <ul ref={ulRef} className="flex flex-col-reverse overflow-y-auto overscroll-contain scroll-smooth" style={{height: "86%"}}>
                {
                    reverseData().map((data, idx) => 
                    <ul key={idx} className="flex flex-col justify-end px-2">
                        <li onClick={ () => handleEquClicked(idx) } key={idx + "eq"} id="eq" className="text-lg text-gray-500 flex justify-end">{data.equation}</li>
                        <li onClick={ () => handleResClicked(idx) } key={idx + "re"} id="re" className="text-xl text-green-500 flex justify-end">{"=" + data.result}</li>
                        <br/>
                    </ul>)
                }
            </ul>
            <div className="flex justify-center align-middle pt-2">
                <Popup msg="계산기록 삭제" parentWidths={parentWidths} isBright={true} onClick={() => reRenderAndDel()}></Popup>
            </div>  
        </div>
    )
}