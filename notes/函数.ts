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


{
  /* 
    定义了两个函数重载来约束函数实体
  */
  function merge(arg1: number, arg2: number): number;
  function merge(arg1: string, arg2: string): string;

  // 即使参数都是any，ts还是会按照上面两个重载的原则去检测
  function merge(arg1: any, arg2: any) {
    return arg1 + arg2;
  }

  merge(11, 11);
  //  merge(11, 11).length;  error, 数字没有length
  merge('11', '11');
  // merge('11', 11);  error
}