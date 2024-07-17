import type { ArrayNum } from "../type/type"

const converter = (arr: ArrayNum): number => {
    const idxOfDot = arr.indexOf(".");
    let Flen: number;

    if(idxOfDot !== -1) {
        Flen = idxOfDot;
    } else {
        Flen = arr.length;
    }

    let result: number = 0;
    let i = 1;
    for(i = 1; i <= Flen; i++) {
        let j = Flen - i;
        result += (arr[i-1] as number)*(10**j);
    }

    for(i = Flen + 1; i < arr.length; i++) {
        result += (arr[i] as number)*(10**(Flen - i));
    }

    return result;
}

export { converter };