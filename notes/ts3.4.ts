import '../styles/index.css';

/*
* readonly可修饰元祖类型
* */
function foo(pair: readonly [string, string]) {
  console.log(pair[0]);   // okay
  // pair[1] = "hello!";     // error
}


/*
* 新增const断言，断言后的变量不可修改
* */

// Type 'hello', 等同于const x = 'hello'
let x = "hello" as const;
// x = 'ss';  error, x只能是'hello'

// Type 'readonly [10, 20]'
let y = [10, 20] as const;

// Type '{ readonly text: "hello" }'
let z = { text: "hello" } as const;

// 也可以用<const>语法断言，tsx文件除外
let x = <const>"hello";
let y = <const>[10, 20];
let z = <const>{ text: "hello" };

// const断言只能用于简单类型
// Error! A 'const' assertion can only be applied to a
// to a string, number, boolean, array, or object literal.
let a = (Math.random() < 0.5 ? 0 : 1) as const;

// Works!
let b = Math.random() < 0.5 ? (0 as const) : (1 as const);