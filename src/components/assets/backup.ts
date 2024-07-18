/** 

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


*/