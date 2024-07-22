interface MeasureType {
    show: boolean,
    input: number,
    result: number,
    inputPush: (x: string) => void,
    inputPop: (x: number) => void,
    setResult: (idx: number, x: string, y: string) => void,
    reset: () => void
}

interface TopBottomType {
    selectISTop: boolean,
    setTop: (x: boolean) => void
}

interface ShowModal {
    show: "팁" | "나누기" | null,
    setShow: (x: "팁" | "나누기") => void,
    setHide: () => void
}

interface TipStoreType {
    tip: number,
    setTip: (x: number) => void
}

interface DivideStoreType {
    divide: number,
    setDivide: (x: number) => void
}

interface UnitTempConversion {
    [key: string]: {
        toBase: (value: number) => number;
        fromBase: (value: number) => number;
    };
}

interface UnitConversion {
    [key: string]: number
}

export type { UnitConversion, UnitTempConversion };

export type { MeasureType, TopBottomType, ShowModal, TipStoreType, DivideStoreType };