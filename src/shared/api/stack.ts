import { Stack, StackNode } from "../type/stackType";

class StackClass<T> implements Stack<T> {
    private _size: number = 0;
    private head?: StackNode<T>;
    private capacity: number;

    constructor(x: number) {
        this.capacity = x;
    }

    get size() {
        return this._size;
    }

    push(value: T): void {
        if(this.size === this.capacity) {
            throw new Error("Stack is full!");
        }

        const node: StackNode<T> = {value, next: this.head};
        this.head = node;
        this._size++;
    }

    pop(): T {
        if(this.head === null) {
            throw new Error("Stack is empty!");
        }

        const node = this.head;
        this.head = (node as StackNode<T>).next;
        this._size--;
        return (node as StackNode<T>).value ;
    }

    empty(): boolean {
        return this.size === 0;
    }

    top(): T {
        const node = this.head;
        return (node as StackNode<T>).value ;
    }
}

export default StackClass;