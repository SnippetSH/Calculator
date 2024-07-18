import { create } from "zustand";
import type { ResultType } from "../type/type";

const resultStore = create<ResultType>((set) => ({
    result: 0,
    showResult: false,
    setResult: (x: number) => set(() => ({result: x})),
    setShowResult: (x: boolean) => set(() => ({showResult: x})),
    reset: () => set(() => ({result: 0, showResult: false}))
}))

export { resultStore };