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
  
  
  
  interface Bird {
		fly();
		layEggs();
	}

	interface Fish {
		swim();
		layEggs();
	}

	function getSmallPet(): Fish | Bird {
		// ...
	}

	let pet = getSmallPet();
	
	// 因为pet是Fish | Bird的联合类型，可以确定的是一定有layEggs方法，但不一定有swim方法
	pet.layEggs(); // okay
	pet.swim();    // errors
}

{
	// 类型保护
	let pet = getSmallPet();

	// 每一个成员访问都会报错
	if (pet.swim) {
		pet.swim();
	}
	else if (pet.fly) {
		pet.fly();
	}
	
	// 这时可以用断言来解决，缺点是太麻烦
	let pet = getSmallPet();
	if ((<Fish>pet).swim) {
		(<Fish>pet).swim();
	}
	else {
		(<Bird>pet).fly();
	}
}



{
	// 自定义类型保护，pet is Fish就是类型谓词
	function isFish(pet: Fish | Bird): pet is Fish {
		return (<Fish>pet).swim !== undefined;
	}
	
	// 'swim' 和 'fly' 调用都没有问题了
	if (isFish(pet)) {
		pet.swim();
	}
	else {
		pet.fly();
	}
}


{
	// 如果只需简单的判断类型，比如typeof,就不用像上面那样特意写个方法了
	function padLeft(value: string, padding: string | number) {
		if (typeof padding === "number") {	// 直接使用
			return Array(padding + 1).join(" ") + value;
		}
		if (typeof padding === "string") {
			return padding + value;
		}
		throw new Error(`Expected string or number, got '${padding}'.`);
	}
}



{
	// 非空断言
	function broken(name: string | null): string {
	  function postfix(epithet: string) {
		/*
			这里的name其实不会为null或undefined，但tsc不知道，认为name还是可能为null | undefined
			如果我们明确知道name不为空，就可用！把null | undefined的联合类型去掉
		*/
		return name!.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
	  }
	  
	  // 保证name有值
	  name = name || "Bob";
	  return postfix("great");
	}
}




{
  /* 
    编译器无法去除嵌套函数的null（除非是立即调用的函数表达式）。 
    因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。 
    如果无法知道函数在哪里被调用，就无法知道调用时 name的类型。
  */
  function fixed(name: string | null): string {
    function postfix(epithet: string) {
      // 使用类型断言去除null和undefined属性
      return name!.charAt(0) + '.  the ' + epithet; // ok
    }
    name = name || "Bob";
    return postfix("great");
  }
}

{
  /* 
    类型别名和接口类似，但是不能被继承
  */
  // 给string起个别名
  type Name = string;

  // NameResolver类型是个返回字符串的函数
  type NameResolver = () => string;

  // 联合类型
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
      return n;
    }
    else {
      return n();
    }
  }

  // 用于泛型
  type Container<T> = { value: T };
  const f: Container<string> = {
    value: 'aa'
  }


  // 使用类型别名来在属性里引用自己：
  type Tree<T> = {
    value: T;
    lefts: Tree<T>;
  }

  const tree: Tree<string> = {
    value: 'aaa',
    lefts: {
      value: 'bbb',
      lefts: {
        value: 'ccc',
        lefts: {
          value: 'ddd'
        }
      }
    }
  }
}


{
  /* 
    字符串字面量类型
  */

  type Easing = "ease-in" | "ease-out" | "ease-in-out";
  class UIElement {
    animate(dx: number, dy: number, easing: Easing) {  // easing只能是上面3个字符串之一
      if (easing === "ease-in") {
        // ...
      }
      else if (easing === "ease-out") {
      }
      else if (easing === "ease-in-out") {
      }
      else {
        // error! should not pass null or undefined.
      }
    }
  }

  let button = new UIElement();
  button.animate(0, 0, "ease-in");
  //  button.animate(0, 0, "uneasy");  error: "uneasy" is not allowed here
}