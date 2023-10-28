type CustomRecord<T extends number | string | symbol, U> = {
  [str in T]: U;
};

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: CustomRecord<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};

type CustomExclude<T, U extends T> = T extends U ? never : T;

type F = CustomExclude<'hello' | 'lol', 'hello'>;

type CustomPick<T extends object, U extends keyof T> = { [Key in U]: T[Key] };

type CustomOmit<T extends object, U extends keyof T> = { [Key in Exclude<keyof T, U>]: T[Key] };

function myFunc(a: string, b: number): boolean {
  return false;
}

type CustomParameters<Type extends (...args: any) => any> = Type extends (...args: any) => infer R ? R : never;

type myT = CustomParameters<typeof myFunc>
