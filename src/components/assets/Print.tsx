import { equationStore } from "../../shared/stateStore/store";
import { useMemo, useState } from "react";

export default function Print() {
  /** num에 대한 idx와 operator에 대한 idx를 따로 관리 (infix, p_Element 모두 동일)
   * 현재 (코드) -> backup.ts 파일 참조
   * 열거나 닫는 괄호를 만나기 전까지는 현재 방식 그대로 가되, 만일 괄호를 만나게 되면 괄호는 바로 push 
   */

  const curEqu = equationStore((state) => state.cur);
  const [curLen, setCurLen] = useState(0);

  const showRender = useMemo(() => {
    const HTML_P: JSX.Element[] = [];
    let len: number = 0;
    let large: boolean = false;
    if(curLen > 15) {
      large = true;
    }
    
    curEqu.map((context, idx) => {
      len += context.length;
      if(!isNaN(Number(context))) { //현재 식의 마지막이 숫자일 경우
        if(context === "-0") {
          console.log(len);
          HTML_P.push(<p key={`number_${idx}`} className={`text-white ${large ? "text-xl" : "text-3xl"}`}>{"-"}</p>)
        } else {
          console.log(len);
          HTML_P.push(<p key={`number_${idx}`} className={`text-white ${large ? "text-xl" : "text-3xl"}`}>{context.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>)
        }
      } else {
        let t: string;
        switch(context) {
          case "*":
            t = '×';
            break;
          case "/":
            t = "÷";
            break;
          default:
            t = context;
            break;
        }
        HTML_P.push(<p key={`operator_${idx}`} className={`text-green-500 ${len > 15 ? "text-2xl" : "text-3xl"}`}>{t}</p>);
      }
    })
    
    setCurLen(len);
    return HTML_P;
  }, [curEqu]);

  return (
    <div id='Print' className="pb-2 w-full h-full flex flex-col justify-end">
      <div className="flex flex-wrap justify-end align-bottom">
        {showRender}
      </div>
    </div>
  );
}
