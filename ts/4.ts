// let x:any = 'hello';
// let y:number;
// y = x; // 污染

// let x:unknown;
// x = 'hello';
// let y:string;
// y = x; // 无法将“unknown”类型的变量分配给其他已知类型的变量。

const b: boolean = true;
const s: string = 'hello';
const n: number = 1;
const bigint: bigint = 1n;
const sym: symbol = Symbol('hello');
const u: undefined = undefined;
const nu: null = null;

const obj: object = { foo: 123 };

const a: number | string = 1;

type sex = 'male' | 'female';

let tuple: [number, string];
tuple = [1, 'hello'];

interface Person {
    name: string;
    age?: number;
    sex: 'male' | 'female'
}
let p: Person = {
    name: 'hello',
    sex: 'male'
}