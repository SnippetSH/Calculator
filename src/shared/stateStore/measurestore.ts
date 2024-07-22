import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { MeasureType } from "../type/measureType";
import { convert, convertTemperature, ConversionList } from "../../shared/api/convertapi";

const measureStore = create(
    subscribeWithSelector<MeasureType>((set) => ({
        show: false,
        input: 0,
        result: 0,
        inputPush: (x: string) => set((state) => {
            let n = state.input.toString() + x;
            return { show: true, input: Number(n) };
        }),
        inputPop: (x: number) => set((state) => {
            let n = state.input.toString();
            for (let i = 0; i < x; i++) {
                if (n.length > 0) {
                    n = n.slice(0, -1);
                } else {
                    break;
                }
            }
            if(n.length === 0) {
                return { show: false, input: Number(n)};
            }
            return { input: Number(n) };
        }),
        setResult: (idx: number, x: string, y: string) => set((state) => {
            //console.log(x, y);
            let result: number = 0;
            if (idx !== 2) {
                result = convert(state.input, x, y, ConversionList[idx]);
            } else {
                result = convertTemperature(state.input, x, y);
            }

            return {result: result};
        }),

        reset: () => set(() => ({ show: false, input: 0, result: 0 }))
    }))
);


export { measureStore };