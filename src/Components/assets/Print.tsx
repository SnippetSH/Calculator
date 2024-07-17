import { operatorStore, numberStore, numIdxStore } from "../../stateStore/store";
import { infixToPostfix, evalPostfix } from "../../shared/api/Calapi";
import { converter } from "../../shared/api/converter";
import { resultStore } from "../../stateStore/result";
import { useEffect, useMemo } from "react";

export default function Print() {
  const num = numberStore((state) => state.num);
  const currentLength = numberStore((state) => state.currentLength);
  const operator = operatorStore((state) => state.operator);
  const setResult = resultStore((state) => state.setResult);

  const numIdx = numIdxStore((state) => state.numIdx);

  const infix = useMemo(() => {
    const Infix: string[] = [];
    num.forEach((arr, idx) => {
      if (num.length > 1 && operator.length > 0 && currentLength[numIdx] !== 0) {
        Infix.push(converter(arr).toString());
        if (operator[idx] !== undefined) {
          Infix.push(operator[idx]);
        }
      } else {
        Infix.push(converter(arr).toString());
      }
    });
    return Infix;
  }, [num, operator, currentLength, numIdx]);

  const p_Element = useMemo(() => {
    return num.map((arr, idx) => {
      return (
        <div key={`element_${idx}`} className="flex">
          <p key={`number_${idx}`} className="text-white text-xl">{arr}</p>
          {operator[idx] && <p key={`operator_${idx}`} className="text-green-500 text-xl">{operator[idx]}</p>}
        </div>
      );
    });
  }, [num, operator]);

  useEffect(() => {
    if (infix.length > 1 && currentLength[numIdx] !== 0) {
      const postfix = infixToPostfix(infix);
      const result = evalPostfix(postfix);
      setResult(result);  // 상태 업데이트
    }
  }, [infix, currentLength, numIdx, setResult]);

  return (
    <div id='Print' className="flex justify-between pb-8">
      {num[0] !== undefined ? p_Element : ''}
    </div>
  );
}
