import {LinkedList} from "../linked_list/linked_list.ts";
import {Stack} from "../stack/stack.ts";

class TwoCell<T> {
    public get end(): LinkedList<T> {
        return this._end;
    }

    public set end(value: LinkedList<T>) {
        this._end = value;
    }

    public readonly start: LinkedList<T>;
    private _end: LinkedList<T>;

    constructor(start: LinkedList<T>, end: LinkedList<T>) {
        this.start = start;
        this._end = end;
    }
}

export class Queue<T> extends Stack<T> {
    public get top(): T | undefined {
        return this.first;
    }

    public get last(): T | undefined {
        return this._twoCell.end.first;
    }

    public override get rest(): Queue<T> | undefined {
        return this._list as Queue<T> | undefined;
    }

    private readonly _twoCell: TwoCell<T>;

    protected constructor(element?: T, queue?: Queue<T>) {
        super(element, queue);

        this._twoCell = new TwoCell<T>(this, this);
    }

    public static override empty<T>(): Queue<T> {
        return new Queue<T>();
    }

    public static override create<T>(element: T, queue?: Queue<T>): Queue<T> {
        if (queue === undefined) return new Queue<T>(element, Queue.empty<T>());

        const newRest = Queue.create(element)
        queue._twoCell.end.replaceRest(newRest);
        queue._twoCell.end = newRest;

        return queue;
    }

    public static push<T>(element: T, queue: Queue<T>): Queue<T> {
        return this.create<T>(element, queue);
    }

    public static override from<T>(iterable: Iterable<T>): Queue<T> {
        let res: Queue<T> | undefined = undefined;

        for (const a of iterable) {
            res = this.create(a, res);
        }

        return res!;
    }

    public override append(queue: Queue<T>): Queue<T> {
        if (this.isEmpty) {
            return queue;
        }

        const newRest = this.rest!.append(queue);

        const newQueue = new Queue<T>(this!.first!, newRest);
        newQueue._twoCell.end = queue._twoCell.end;

        return newQueue;
    }

    public pop(): Queue<T> {
        if (this._twoCell.start === this._twoCell.end) {
            return this;
        }

        const newQueue = new Queue<T>(this.rest!.first!, this.rest!.rest);
        newQueue._twoCell.end = this._twoCell.end;

        return newQueue;
    }

    protected override _appendString(s: string): string {
        if (this.isEmpty && s.length === 0) {
            return '[x]';
        }

        if (this.isEmpty && s.length > 0) {
            if (s.endsWith('S')) {
                s += '+';
            } else {
                s += '('
            }

            s += 'E)|/]';
            return s;
        }

        if (s.length === 0) {
            s += `[${this.first}(S`;
        } else {
            if (s.endsWith('S')) {
                s += ')'
            }
            s += `|*]->[${this.first}`;
        }

        return this.rest!._appendString(s);
    }
}