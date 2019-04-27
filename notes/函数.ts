{
  /*
  * 类型别名type定义函数接口，相当于：
   interface Add {
      (x: number, y: number): number
   }
  * */
  type Add = (x: number, y: number) => number;
  const addFunc: Add = (arg1: number, arg2: number) => arg2 + arg1;
  addFunc(1, 2);
}