{
  // 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

  // x变量是个数组，长度必须为2（2.6以后的新规定），且0号必须是字符串，1号必须是数字，
  let x: [string, number];
  x = ['hello', 10]; // OK
  // x = [10, 'hello']; // Error
}


{
  // 类型断言
  function getLen(target: string | number): number {
    if ((<string>target).length || (<string>target).length === 0) {
       /* 
        因为number没有length属性，但是这个函数逻辑是没有问题的
        所以使用类型断言告诉ts，第一个if语句的target一定是个string
       */
      return (target as string).length; // 推荐写法
    }else {
      return target.toString().length;
    }
  }
}