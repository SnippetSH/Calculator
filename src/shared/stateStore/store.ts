/** number and operator store.ts */
import { create } from "zustand";
import type { EquationStore } from "../type/type";

const equationStore = create<EquationStore>((set) => ({
    cur: [],
    prev: [],
    push: (x: string) => set((state) => {
        const tmpPrev = [...state.cur];
        return {
            cur: [...state.cur, x],
            prev: tmpPrev
        }
    }),
    pop: (x: number) => set((state) => {
        const tmpPrev = [...state.cur];
        let tmpCur = [...state.cur];

        for(let i = 0; i < x; i++) {
            if(tmpCur.length > 0) {
                tmpCur = tmpCur.slice(0, -1);
            } else {
                break;
            }
        }

        return {
            cur: tmpCur,
            prev: tmpPrev
        }
    }),
    setEqu: (x: string[]) => set(() => ({cur: x})),
    reset: () => set(() => ({
        cur: [],
        prev: []
    }))
}))

export { equationStore };