{
  /* 
    交叉类型（于）
    下面函数返回T U 的结合类型
  */

  function mergeFunc<T, U>(arg1: T, arg2: U): T & U {
    let res = {} as T & U;
    res = { ...arg1, ...arg2 };
    return res;
  }
}


{
  /* 
    联合类型（或）
  */

  function getLen(arg: string | number): number {
    return typeof arg === 'string' ? arg.length : arg.toString().length;
  }
}
