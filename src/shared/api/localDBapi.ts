import type { HistoryStorage } from "../type/type";

const InitStorage = () => {
    const initialData: HistoryStorage[] = [];
    localStorage.setItem('history', JSON.stringify(initialData));
}

const saveData = (equ: string[], res: number) => {
    const tmpData = localStorage.getItem('history');
    let Data: HistoryStorage[] = [];

    // tmpData가 유효한 JSON 문자열인지 확인하고, 그렇지 않으면 빈 배열로 초기화
    try {
        Data = JSON.parse(tmpData ?? "[]");
        if (!Array.isArray(Data)) {
            Data = [];
        }
    } catch (e) {
        Data = [];
    }

    if (Data.length === 0 || Data[0].equation === undefined) {
        console.log("없는 값에 접근 시도 중임");
        // 빈 데이터가 생성될 경우 초기화 (필요한 경우)
        Data = [{
            equation: equ,
            result: res
        }];
    } else {
        Data.push({
            equation: equ,
            result: res
        });
    }

    localStorage.setItem('history', JSON.stringify(Data));
}


const loadData = (idx: number): HistoryStorage => {
    const tmpData = localStorage.getItem('history');
    const Data: HistoryStorage[] = JSON.parse(typeof tmpData === 'string' ? tmpData : "{}");
    if(idx < Data.length) {
        return Data[idx];
    } else {
        return {equation: ["null"]}
    }
}

export { InitStorage, saveData, loadData };