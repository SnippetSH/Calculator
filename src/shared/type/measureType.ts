interface MeasureType {
    show: boolean,
    input: number,
    result: number,
    inputPush: (x: string) => void,
    inputPop: (x: number) => void,
    setResult: (idx: number, x: string, y: string) => void,
    reset: () => void
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

export type { UnitConversion, UnitTempConversion};

export type { MeasureType };