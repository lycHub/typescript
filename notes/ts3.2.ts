import '../styles/index.css';

/*
* 新增bigint类型，可以用BigInt方法创建此类型的变量
* */
const foo: bigint = BigInt(100);
// const bar: bigint = 100n; 这种写法要求不低于ecma2020
const count = 20;
// console.log(foo * count);  不能与number相互赋值和运算


if (typeof foo === "bigint") {
  console.log("'foo' is a bigint!");
} else {
  console.log("'foo' is a floating-point number");
}