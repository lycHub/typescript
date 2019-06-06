{
  /* 
    索引类型查询（keyof）
  */

  // keyof返回T所有属性组成的联合类型
  function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
  }

  interface Person {
    name: string;
    age: number;
  }
  let person: Person = {
    name: 'Jarid',
    age: 35
  };

  // 传入name:  K[] === string[] === T[K][]
  let strings: Array<string | number> = pluck(person, ['name', 'age']); // ok, string[]
}


{
  /* 
    映射类型
  */


  interface PersonPartial {
    name: string;
    age: number;
  }

  // 将PersonPartial下的所有属性都变成只读或可选的
  // [P in keyof T] 循环T下的每一个key

  type PartialKey<T> = {
    [P in keyof T]?: T[P];
  }


  type ReadonlyKey<T> = {
    readonly [P in keyof T]: T[P];
  }


  // PersonPartial的readonly版
  type ReadOnlyPerson = ReadonlyKey<PersonPartial>;
  const person: ReadOnlyPerson = {
    name: 'aa',
    age: 33
  }
  // person.age = 24; error，只读

  // 由于可选和只读很常用，ts已经预定好Readonly和Partial，不需要自己定义
  const person2: Readonly<PersonPartial> = {
    name: 'aa',
    age: 33
  }

  const person3: Partial<PersonPartial> = {
    name: 'aa',
    age: 33
  }


  // 逆向操作
  type RemoveReadOnly<T> = {
    -readonly [P in keyof T]-?: T[P];
  }

  // 还原PersonPartial
  type withoutReadOnly = RemoveReadOnly<ReadOnlyPerson>;


  // 还有两个内置的映射类型：
  type Pick<T, K extends keyof T> = { // 从原对象上挑选一部分属性作为类型
    [P in K]: T[P];
  }


  interface Info2 {
    name: string;
    age: number;
    address: string;
  }

  const info5: Info2 = {
    name: 'lison',
    age: 18,
    address: 'beijing',
  }
  function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const res: any = {}
    keys.map((key) => {
      res[key] = obj[key]
    })
    return res
  }
  const nameAndAddress = pick(info5, ['name', 'address'])
  // console.log(nameAndAddress)


  type Record<K extends string, T> = {
    [P in K]: T;
  }
}


{
  // unknown
  // [1] 任何类型都可以赋值给unknown类型
  let value1: unknown
  value1 = 'a'
  value1 = 123

  // [2] unknown类型只能赋值给unknown和any类型
  let value2: unknown
  // let value3: string = value2 error
  value1 = value2


  // [3] unknown类型不能进行操作
  let value4: unknown;
  value4 = 1;
  // value4 += 1; error


  // [4] unknown与任何其他类型组成的交叉类型，最后都等于其他类型
  type type1 = string & unknown
  type type2 = number & unknown
  type type3 = unknown & unknown
  type type4 = unknown & string[]


  // [5] unknown与任何其他类型(除了any是any)组成的联合类型，都等于unknown类型
  type type5 = unknown | string
  type type6 = any | unknown
  type type7 = number[] | unknown


  // [6] never类型是unknown的子类型
  type type8 = never extends unknown ? true : false

  // [7] keyof unknown 等于类型never
  type type9 = keyof unknown


  // [8] 只能对unknown进行等或不等操作，不能进行其他操作
  // value1 === value2
  // value1 !== value2
  // value1 += value2 error


  // [9] unknown类型的值不能访问他的属性、作为函数调用和作为类创建实例
  let value10: unknown
  // value10.age
  // value10()
  // new value10()


  // [10] 使用映射类型时如果遍历的是unknown类型，则不会映射任何属性
  type Types1<T> = {
    [P in keyof T]: number
  }
  type type11 = Types1<any>
  type type12 = Types1<unknown>
}


{
  // T extends U ? X : Y
  type Types2<T> = T extends string ? string : number
  // let index: Types2<string> string
  // let index: Types2<'a'> string
  // let index: Types2<123> number
  // let index: Types2<false> number

  // type TypeName<T> = T extends any ? T : never
  // type Type3 = TypeName<string | number>



  type TypeName<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    T extends undefined ? undefined :
    T extends () => void ? () => void :
    object
  type Type4 = TypeName<() => void> // () => void
  type Type5 = TypeName<string[]>   // object
  type Type6 = TypeName<(() => void) | string[]>  // () => void | object


  type Diff<T, U> = T extends U ? never : T
  type Test2 = Diff<string | number | boolean, undefined | number>  // string | boolean

  // 值T[K]是否为Function? 是的话值为T的key,否则值为never
  type Type7<T> = {
    [K in keyof T]: T[K] extends Function ? K : never
  }[keyof T]  // [keyof T]返回值不为never的key

  interface Part {
    id: number;
    name: string;
    subparts(newName: string): void;   // Function
    undatePart(newName: string): void; // Function
  }
  type Test1 = Type7<Part>  // subparts | undatePart
}


{
  // 如果T是数组，返回成员类型，否则返回自身
  type Type8<T> = T extends any[] ? T[number] : T
  type Test3 = Type8<string[]>  // string
  type Test4 = Type8<string>    // string


  // infer写法, 效果同上
  type Type9<T> = T extends Array<infer U> ? U : T;
}

{
  // 内置条件类型
  /*   
  
  Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
  Extract<T, U> -- 提取T中可以赋值给U的类型。
  NonNullable<T> -- 从T中剔除null和undefined。
  ReturnType<T> -- 获取函数返回值类型。
  InstanceType<T> -- 获取构造函数类型的实例类型。
   */


  type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
  type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

  type T02 = Exclude<string | number | (() => void), Function>;  // string | number
  type T03 = Extract<string | number | (() => void), Function>;  // () => void

  type T04 = NonNullable<string | number | undefined>;  // string | number
  type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

  function f1(s: string) {
    return { a: 1, b: s };
  }

  class C {
    x = 0;
    y = 0;
  }

  type T10 = ReturnType<() => string>;  // string
  type T11 = ReturnType<(s: string) => void>;  // void
  type T12 = ReturnType<(<T>() => T)>;  // {}
  type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
  type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
  type T15 = ReturnType<any>;  // any
  type T16 = ReturnType<never>;  // any
  type T17 = ReturnType<string>;  // Error
  type T18 = ReturnType<Function>;  // Error

  type T20 = InstanceType<typeof C>;  // C
  type T21 = InstanceType<any>;  // any
  type T22 = InstanceType<never>;  // any
  type T23 = InstanceType<string>;  // Error
  type T24 = InstanceType<Function>;  // Error

}