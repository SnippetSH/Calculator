interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
    empty(): boolean;
    top(): T;
}

type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
}

export type { Stack, StackNode };