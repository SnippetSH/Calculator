interface ResultType {
    result: number,
    showResult: boolean,
    setResult: (x: number) => void,
    setShowResult: (x: boolean) => void
    reset: () => void
}

interface EquationStore {
    cur: string[],
    prev: string[],
    push: (x: string) => void,
    pop: (x: number) => void,
    setEqu: (x: string[]) => void,
    reset: () => void
}

type HistoryStorage = {
    equation: string[],
    result?: number
}

export type { ResultType, EquationStore, HistoryStorage };