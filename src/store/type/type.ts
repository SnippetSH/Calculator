type ArrayNum = number[];

interface NumberStoreType {
    num: ArrayNum[]
    currentLength: ArrayNum
    addMore: () => void
    addNum: (idx: number, x: number) => void
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
    setResult: (x: ArrayNum[], op: string[]) => void
    reset: () => void
}

export type { ArrayNum, NumberStoreType, OperatorType, NumIdxType, ResultType };