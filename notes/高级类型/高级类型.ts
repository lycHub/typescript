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