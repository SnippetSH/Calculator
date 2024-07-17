import { create } from "zustand";
import type { ArrayNum, ResultType } from "../shared/type/type";

const resultStore = create<ResultType>((set) => ({
    result: 0,
    showResult: false,
    setResult: (x: number) => set(() => ({result: x})),
    setShowResult: (x: boolean) => set(() => {
        return {showResult: x};
    }),
    reset: () => set(() => ({result: 0, showResult: false}))
}))

export { resultStore };