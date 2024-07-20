interface BothIn {
    signName: string,
    sign: string,
    expo?: number
}

interface UpDownCompType {
    id: string,
    Content: BothIn[]
};

const Unit: UpDownCompType[] = [];

class 면적 implements UpDownCompType {
    id: string;
    Content: BothIn[];
    constructor() {
        this.id = "면적";
        this.Content = [
            {signName: "에이커", sign: "ac"},
            {signName: "아르", sign: "a"},
            {signName: "헥타르", sign: "ha"},
            {signName: "제곱센티미터", sign: "cm", expo: 2},
            {signName: "제곱피트", sign: "ft", expo: 2},
            {signName: "제곱인치", sign: "in", expo: 2},
            {signName: "제곱미터", sign: "m", expo: 2},
            {signName: "평", sign: "평"},
        ];
    }
}

class 길이 implements UpDownCompType {
    id: string;
    Content: BothIn[];
    constructor() {
        this.id = "길이";
        this.Content = [
            {signName: "밀리미터", sign: "mm"},
            {signName: "센티미터", sign: "cm"},
            {signName: "미터", sign: "m"},
            {signName: "킬로미터", sign: "km"},
            {signName: "인치", sign: "in"},
            {signName: "피트", sign: "ft"},
            {signName: "야드", sign: "yd"},
            {signName: "마일", sign: "mi"},
            {signName: "해리", sign: "NM"},
            {signName: "자", sign: "자"},
            {signName: "리", sign: "리"},
        ];
    }
}

class 온도 implements UpDownCompType {
    id: string;
    Content: BothIn[];
    constructor() {
        this.id = "온도";
        this.Content = [
            {signName: "섭씨", sign: "°C"},
            {signName: "화씨", sign: "°F"},
            {signName: "켈빈", sign: "K"},
        ];
    }
}

class 부피 implements UpDownCompType {
    id: string;
    Content: BothIn[];
    constructor() {
        this.id = "부피";
        this.Content = [
            {signName: "리터", sign: "l"},
            {signName: "밀리리터", sign: "ml"},
            {signName: "세제곱센티미터", sign: "cm", expo: 3},
            {signName: "세제곱미터", sign: "m", expo: 3},
            {signName: "세제곱인치", sign: "in", expo: 3},
            {signName: "세제곱피트", sign: "ft", expo: 3},
            {signName: "말", sign: "말"},
            {signName: "되", sign: "되"},
        ];
    }
}

class 무게 implements UpDownCompType {
    id: string;
    Content: BothIn[];
    constructor() {
        this.id = "무게";
        this.Content = [
            {signName: "톤", sign: "t"},
            {signName: "파운드", sign: "lb"},
            {signName: "온스", sign: "oz"},
            {signName: "킬로그램", sign: "kg"},
            {signName: "그램", sign: "g"},
            {signName: "근", sign: "근"},
            {signName: "돈", sign: "톤"},
        ];
    }
}

class 데이터 implements UpDownCompType {
    id: string;
    Content: BothIn[];
    constructor() {
        this.id = "데이터";
        this.Content = [
            {signName: "비트", sign: "bit"},
            {signName: "바이트", sign: "B"},
            {signName: "킬로바이트", sign: "KB"},
            {signName: "메가바이트", sign: "MB"},
            {signName: "기가바이트", sign: "GB"},
            {signName: "테라바이트", sign: "TB"},
        ]
    }
}

class 속도 implements UpDownCompType {
    id: string;
    Content: BothIn[];
    constructor() {
        this.id = "속도";
        this.Content = [
            {signName: "초당 미터", sign: "m/s"},
            {signName: "시간당 미터", sign: "m/h"},
            {signName: "초당 킬로미터", sign: "km/s"},
            {signName: "시간당 킬로미터", sign: "km/h"},
            {signName: "초당 인치", sign: "in/s"},
            {signName: "시간당 인치", sign: "in/h"},
            {signName: "초당 피트", sign: "ft/s"},
            {signName: "시간당 피트", sign: "ft/h"},
            {signName: "초당 마일", sign: "mi/s"},
            {signName: "시간당 마일", sign: "mi/h"},
            {signName: "노트", sign: "kn"},
        ];
    }
}

class 시간 implements UpDownCompType {
    id: string;
    Content: BothIn[];
    constructor() {
        this.id = "시간";
        this.Content = [
            {signName: "밀리초", sign: "ms"},
            {signName: "초", sign: "s"},
            {signName: "분", sign: "min"},
            {signName: "시간", sign: "h"},
            {signName: "일", sign: "d"},
            {signName: "주", sign: "wk"},
        ]
    }
}

const Tip = {
    id: "팁",
    Top: "소계",
    Down: "전체"
}

Unit.push(new 면적());
Unit.push(new 길이());
Unit.push(new 온도());
Unit.push(new 부피());
Unit.push(new 무게());
Unit.push(new 데이터());
Unit.push(new 속도());
Unit.push(new 시간());

export { Unit, type UpDownCompType, Tip };