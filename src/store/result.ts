import { create } from "zustand";
import type { ArrayNum, ResultType } from "./type/type";

const resultStore = create<ResultType>((set) => ({
    result: 0,
    setResult: (x: ArrayNum[], op: string[]) => set(() => {
        let r: number = 0;
        const convertArr: ArrayNum = [];
        x.map((arr) => {
            const len = arr.length;
            let tmp = 0;
            for(let i = 1; i <= len; i++) {
                let j = len - i;
                tmp += (arr[i-1]*(10**j));
            }
            convertArr.push(tmp);
        })

        r = convertArr[0];
        for(let i = 1; i < convertArr.length; i++) {
            switch(op[i-1]) {
                case '+':
                    r+=convertArr[i];
                    break;
                case '-':
                    r-=convertArr[i];
                    break;
                case '*':
                    r*=convertArr[i];
                    break;
                case '/':
                    r/=convertArr[i];
                    break;
                default:
                    break;
            }
        }
        return {
            result: r
        }
    }),
    reset: () => set(() => ({result: 0}))
}))

export { resultStore };