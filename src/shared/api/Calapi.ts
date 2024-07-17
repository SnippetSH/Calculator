import StackClass from './stack';

type StringArr = string[]

const prec = (op: string): number => {
	switch (op) {
	// 우선순위가 낮은 순으로	
	case '(': case ')': return 0;
	case '+': case '-': return 1;
	case '*': case '/': return 2;
	}
	return -1;
}

const infixToPostfix = (exp: StringArr): StringArr => {
    let result: StringArr = [];
    let i: number = 0;
    let ch: string, top_op: string;
    let len: number = exp.length;

    const s = new StackClass<string>(100);
    for(i = 0; i < len; i++) {
        ch = exp[i];

        switch(ch) {
            case "+": case "-": case "*": case "/":
                while(!s.empty() && (prec(ch) <= prec(s.top()))) {
                    result.push(s.pop());
                }
                s.push(ch);
                break;
            case "(":
                s.push(ch);
                break;
            case ")":
                top_op = s.pop();

                while(top_op !== "(") {
                    result.push(top_op);
                    top_op = s.pop();
                }
                break;
            default:
                result.push(ch);
                break;
        }
    }

    while(!s.empty()) {
        result.push(s.pop());
    }
    return result;
}


const evalPostfix = (exp: StringArr): number => {
    let op1: number, op2: number, i: number = 0;
    let len: number = exp.length; 
    let ch: string;

    const s = new StackClass<number>(100);
    for(i = 0; i < len; i++) {
        ch = exp[i];

        if(!isNaN(Number(exp[i]))) {
            s.push(Number(exp[i]));
        } else {
            op2 = s.pop();
            op1 = s.pop();

            switch(ch) {
                case "+":
                    s.push(op1 + op2);
                    break;
                case "-":
                    s.push(op1 - op2);
                    break;
                case "*":
                    s.push(op1 * op2);
                    break;
                case "/":
                    s.push(op1 / op2);
                    break;
            }
        }
    }

    return s.pop();
}

export { infixToPostfix, evalPostfix };