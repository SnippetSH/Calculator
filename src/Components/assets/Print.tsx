import { operatorStore, numberStore } from "../../store/store";

export default function Print() {
  const num = numberStore((state) => state.num);
  const operator = operatorStore((state) => state.operator);

  const returnPrint = ():JSX.Element[] => {
    const p_Element: JSX.Element[] = [];
    num.map((arr, idx) => {
      if(idx !== num.length) {
        //output.push(arr);
        p_Element.push(<p key={`number_${idx}`} className="text-white text-xl">{arr}</p>)
        //output.push(operator[idx]);
        p_Element.push(<p key={`operator_${idx}`} className="text-green-500 text-xl">{operator[idx]}</p>)
      } else {
        p_Element.push(<p key={`number_${idx}`} className="text-white text-xl">{arr}</p>)
      }
    });

    return p_Element;
  }

  return (
    <div id='Print' className="flex justify-between pb-8">
        {returnPrint().map((content: JSX.Element) => content)}
    </div>
  )
}