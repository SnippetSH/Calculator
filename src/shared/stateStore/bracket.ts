import { create } from "zustand"

interface BracketState {
    bracketNum: number
    setBracket: (isOpen: boolean) => void
    reset: () => void
}

const bracketStore = create<BracketState>((set) => ({
    bracketNum: 0,
    setBracket: (isOpen: boolean) => set((state) => {
        if(isOpen) { return {bracketNum: state.bracketNum + 1} }
        else { return {bracketNum: state.bracketNum - 1} }
    }),
    reset: () => set(() => ({bracketNum : 0}))
}))

export { bracketStore };