{
  /*
   * 我们需要一种方法使返回值的类型与传入参数的类型是相同的。
   * 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
   * */
  
  function getArr<T>(value: T, times: number = 5): T[] {
    return new Array(times).fill(value);
  }

// 调用时指定T是个number类型
  console.log(getArr<number>('srt', 4));  // error
  console.log(getArr<number>(222, 4));
}

{
  function getArrs<T, U>(arg1: T, arg2: U, times: number = 5): [T, U][] {
    return new Array(times).fill([arg1, arg2]);
  }
  
  console.log(getArrs<string, number>('srt', 333), 3);
  
  // 就算不指定泛型类型<string, number>，ts也会根据传入的参数做推断
  console.log(getArrs('srt', 333), 3);
// [['str', 333], ['str', 333], ['str', 333]]
}


{
  // 泛型类型
  function identity<T>(arg: T): T {
    return arg;
  }
  
  let myIdentity: <T>(arg: T) => T = identity;
  
  // 也可以使用不同的泛型参数名
  let myIdentity: <U>(arg: U) => U = identity;
  
  // 还可以使用带有调用签名的对象字面量来定义泛型函数
  let myIdentity: {<T>(arg: T): T} = identity;
}


{
  // 泛型接口
  interface GenericIdentityFn {
    <T>(arg: T): T;
  }
  function identity<T>(arg: T): T {
    return arg;
  }
  let myIdentity: GenericIdentityFn = identity;
}

{
  /*
  * 泛型约束
  * */
  interface Lengthwise {
    length: number;
  }
  
  // 约束参数，必须带有length属性
  function getArr<T extends Lengthwise>(value: T, times: number = 5): T[] {
    return new Array(times).fill(value);
  }
  
  console.log(getArr('str'));
  getArr({
    length: 222
  });
  getArr(123); // error
}

{
  // 在泛型约束中使用类型参数，keyof返回T所有属性组成的联合类型
  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }
  
  let x = { a: 1, b: 2, c: 3, d: 4 };
  
  getProperty(x, "a"); // okay
  getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
}