/** number and operator store.ts */
import { create } from "zustand";
import type { ArrayNum, NumberStoreType, OperatorType, NumIdxType } from "./type/type";

const numberStore = create<NumberStoreType>((set) => ({
    num: [],
    currentLength: [],
    addMore: () => set((state) => ({
        num: [...state.num, []],
        currentLength: [...state.currentLength, 0]
    })),
    addNum: (idx: number, x: number) => set((state) => {
        const newNum = state.num.map((arr, i) => 
            i === idx ? [...arr, x] : arr
        );
        const newLen = [...state.currentLength];
        newLen[idx] += 1;

        // console.log('add 1: ',newNum);
        // console.log('add 2: ', newLen);
        return { 
            num: newNum,
            currentLength: newLen
        };  
    }),
    remove: (idx: number) => set((state) => {
        const newNum = state.num.reduce<ArrayNum[]>((acc, arr, i) => {
            if(i === idx) {
                const newArr = arr.slice(0, -1);
                if(newArr.length > 0) {
                    acc.push(newArr);
                }
            } else {
                acc.push(arr);
            }
            return acc;
        }, []);

        // console.log('remove 1:', newNum);

        const newLen = [...state.currentLength];
        newLen[idx] -= 1;
        // console.log('remove 2: ', newLen);

        if(newLen[idx] === 0) {
            newLen.splice(idx, 1);
        }

        // console.log('remove 2 after:', newLen);
        
        return { 
            num: newNum,
            currentLength: newLen
         };
    }),
    removeCurLen: () => set((state) => {
        const newLen = state.currentLength.slice(0, -1);
        return {
            currentLength: newLen
        }
    }),
    reset: () => set((state) => {
        const one = [...state.num];
        one.splice(0, one.length);
        const two = [...state.currentLength];
        two.splice(0, two.length);

        return {
            num: one,
            currentLength: two
        }
    })
}));

const operatorStore = create<OperatorType>((set) => ({
    operator: [],
    addOperator: (x: string) => set((state) => {
        return {
            operator: [...state.operator, x]
        };
    }),
    removeOperator: () => set((state) => {
        const newOp = state.operator.slice(0, -1);
        return {
            operator: newOp
        }
    }),
    reset: () => set((state) => {
        const one = [...state.operator];
        one.splice(0, one.length);
        return {
            operator: one
        }
    })
}))

const numIdxStore = create<NumIdxType>((set) => ({
    numIdx: 0,
    setNumIdx: (x: boolean) => set((state) => (
        x ? {numIdx: state.numIdx + 1} : {numIdx: state.numIdx - 1}
    )),
    reset: () => set(() => ({
        numIdx: 0
    }))
}))

export { numberStore, operatorStore, numIdxStore };