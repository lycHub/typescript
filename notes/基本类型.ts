{
  // 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

  // x变量是个数组，长度必须为2（2.6以后的新规定），且0号必须是字符串，1号必须是数字，
  let x: [string, number];
  x = ['hello', 10]; // OK
  // x = [10, 'hello']; // Error
}

{
    /*
    * ReadonlyArray<T>类型，
    * 它与Array<T>相似，只是把所有可变方法去掉了，
    * 因此可以确保数组创建后再也不能被修改：
    * */
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    ro[0] = 12; // error!
    ro.push(5); // error!
    ro.length = 100; // error!
    a = ro; // error!
    a = ro as number[]; // true
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


{
	// null和undefined
	null和undefined是任意类型的子类型，可以随意赋值，除非开启了strictNullChecks
	当开启了strictNullChecks，null和undefined就不能赋给其他类型的变量
	这时如果一个变量可能为Null,就要用联合类型
	const test: number | null
}

{
	
	never 类型是任何类型的子类型，也可以赋值给任何类型；
	然而，没有类型是 never 的子类型或可以赋值给never 类型（除了 never 本身之外）。
	即使 any 也不可以赋值给 never
	通常用于抛出异常或不会结束的函数
	
	// 返回never的函数必须存在无法达到的终点
	function error(message: string): never {
	  throw new Error(message)
	}

	// 推断的返回值类型为never
	function fail() {
	  return error("Something failed")
	}

	// 返回never的函数必须存在无法达到的终点
	function infiniteLoop(): never {
	  while (true) {
		  
	  }
	}
}