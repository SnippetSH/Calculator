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
    reset: () => void
}

export type { ResultType, EquationStore };