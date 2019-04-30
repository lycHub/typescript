function mergeFuncs<T, U>(arg1: T, arg2: U): T | U {
  let res = {} as T & U;
  res = { ...arg1, ...arg2 };
  return res;
}