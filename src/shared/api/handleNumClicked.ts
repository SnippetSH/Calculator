export function handleNumClickedfunc(x: string, curEqu: string[], pushEqu: (y: string) => void, popEqu: (y: number) => void, showResult: boolean, setShowResult: (y: boolean) => void, setMsg?: (msg: string) => void, setShowPopup?: (val: boolean) => void, setPopup?: (val: boolean) => void) {
    if(curEqu[curEqu.length-1] === ")") {
        pushEqu("*");
      }
      if(showResult) {
        setShowResult(false);
      }
  
      if(x === "0" && curEqu[curEqu.length - 1] === "/") {
        setMsg && setMsg("잘못된 입력입니다.");
        setShowPopup && setShowPopup(true)
        setPopup&& setPopup(true);
        return;
      }

      if(x === "." && curEqu[curEqu.length - 1] === ".") {
        setMsg && setMsg("잘못된 입력입니다.");
        setShowPopup && setShowPopup(true)
        setPopup&& setPopup(true);
        return;
      }
      
      let tmp = x
      if(curEqu[curEqu.length - 1] === "-0") {
        popEqu(1);
        tmp = (-Number(x)).toString();
      } else if(Number(curEqu[curEqu.length - 1]) === 0) {
        popEqu(1);
      } else if(!isNaN(Number(curEqu[curEqu.length - 1])) || curEqu[curEqu.length - 1] === ".") {
        if(curEqu[curEqu.length - 1].length === 15) {
          setMsg && setMsg("15자리까지 입력할 수 있어요.");
          setShowPopup && setShowPopup(true)
          setPopup&& setPopup(true);
          return;
        }
        tmp = curEqu[curEqu.length - 1];
        popEqu(1);
        tmp += x;
      }
      pushEqu(tmp);
}