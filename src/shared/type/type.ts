type ArrayNum = (number|string)[];

interface NumberStoreType {
    num: ArrayNum[]
    currentLength: number[]
    addMore: () => void
    addNum: (idx: number, x: number|string) => void
    remove: (idx: number) => void
    removeCurLen: () => void
    reset: () => void
}

interface OperatorType {
    operator: string[]
    addOperator: (x: string) => void
    removeOperator: () => void
    reset: () => void
}

interface NumIdxType {
    numIdx: number,
    setNumIdx: (x: boolean) => void
    reset: () => void
}

interface ResultType {
    result: number,
    showResult: boolean,
    setResult: (x: number) => void,
    setShowResult: (x: boolean) => void
    reset: () => void
}

export type { ArrayNum, NumberStoreType, OperatorType, NumIdxType, ResultType };