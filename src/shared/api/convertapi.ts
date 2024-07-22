import type { UnitConversion, UnitTempConversion } from "../type/measureType";
import { roundToPrecision } from "./Calapi";

const areaConversions: UnitConversion = {
    "제곱미터": 1,
    "제곱센티미터": 0.0001,
    "제곱인치": 0.00064516,
    "제곱피트": 0.092903,
    "아르": 0.01,
    "에이커": 4046.86,
    "헥타르": 10000,
    "평": 3.3058,
};

const lengthConversions: UnitConversion = {
    "미터": 1,
    "밀리미터": 0.001,
    "센티미터": 0.01,
    "킬로미터": 1000,
    "인치": 0.0254,
    "피트": 0.3048,
    "야드": 0.9144,
    "마일": 1609.34,
    "해리": 1852,
    "자": 0.3,
    "리": 393,
};

const volumeConversions: UnitConversion = {
    "리터": 1,
    "밀리리터": 0.001,
    "세제곱센티미터": 0.001,
    "세제곱미터": 1000,
    "세제곱인치": 0.0163871,
    "세제곱피트": 28.3168,
    "말": 18.039,
    "되": 1.8039,
};

const weightConversions: UnitConversion = {
    "킬로그램": 1,
    "그램": 0.001,
    "밀리그램": 0.000001,
    "톤": 1000,
    "파운드": 0.453592,
    "온스": 0.0283495,
    "근": 0.6,
    "돈": 0.00375,
};

const dataConversions: UnitConversion = {
    "비트": 1,
    "바이트": 8,
    "킬로바이트": 8 * 1024,
    "메가바이트": 8 * 1024 * 1024,
    "기가바이트": 8 * 1024 * 1024 * 1024,
    "테라바이트": 8 * 1024 * 1024 * 1024 * 1024,
};

const speedConversions = {
    "초당 미터": 1,
    "시간당 미터": 1 / 3600, // 1 미터/시간은 1/3600 미터/초
    "초당 킬로미터": 1000, // 1 킬로미터/초는 1000 미터/초
    "시간당 킬로미터": 1000 / 3600, // 1 킬로미터/시간은 1000/3600 미터/초
    "초당 인치": 0.0254, // 1 인치/초는 0.0254 미터/초
    "시간당 인치": 0.0254 / 3600, // 1 인치/시간은 0.0254/3600 미터/초
    "초당 피트": 0.3048, // 1 피트/초는 0.3048 미터/초
    "시간당 피트": 0.3048 / 3600, // 1 피트/시간은 0.3048/3600 미터/초
    "초당 마일": 1609.34, // 1 마일/초는 1609.34 미터/초
    "시간당 마일": 1609.34 / 3600, // 1 마일/시간은 1609.34/3600 미터/초
    "노트": 0.514444, // 1 노트는 0.514444 미터/초
  };
  

const timeConversions: UnitConversion = {
    "초": 1,
    "밀리초": 0.001,
    "분": 60,
    "시간": 3600,
    "일": 86400,
    "주": 604800,
};

const temperatureConversions: UnitTempConversion = {
    "섭씨": {
        toBase: (value: number) => value,
        fromBase: (value: number) => value,
    },
    "화씨": {
        toBase: (value: number) => (value / (5/9)) + 32,
        fromBase: (value: number) => (value - 32) * (5/9),
    },
    "켈빈": {
        toBase: (value: number) => value + 273.15,
        fromBase: (value: number) => value - 273.15,
    },
};

const convert = (value: number, fromUnit: string, toUnit: string, conversionTable: { [key: string]: number }) => {
    
    if (!(fromUnit in conversionTable) || !(toUnit in conversionTable)) {
        throw new Error("Invalid units");
    }
    console.log(value);
    console.log(fromUnit, toUnit);
    const baseValue = value * conversionTable[fromUnit]; // Convert to base unit
    return roundToPrecision(baseValue / conversionTable[toUnit], 10); // Convert from base unit to target unit
};

const convertTemperature = (value: number, fromUnit: string, toUnit: string) => {
    
    const fromConversion = temperatureConversions[fromUnit];
    const toConversion = temperatureConversions[toUnit];

    if (!fromConversion || !toConversion) {
        throw new Error("Invalid temperature units");
    }

    const baseValue = fromConversion.fromBase(value);
    return roundToPrecision(toConversion.toBase(baseValue), 10);
};

const ConversionList: UnitConversion[] = [
    areaConversions,
    lengthConversions,
    {},
    volumeConversions,
    weightConversions, 
    dataConversions,
    speedConversions, 
    timeConversions
]

export {ConversionList, temperatureConversions, convert, convertTemperature};