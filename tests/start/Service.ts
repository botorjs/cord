
export class ServiceTest {
    private _count: number;

    constructor() {
        this._count = 0;
    }

    public get count(): number {
        return this._count
    }

    public inc() {
        this._count++;
    }

    public sub() {
        this._count--;
    }
}