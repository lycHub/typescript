import '../styles/index.css';

/*
* #开头的私有属性，类似private修饰符
* 也是ecma即将到来的新特性
* */

class Person {
  #name: string;
  constructor(name: string) {
    this.#name = name;
  }
  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}
let jeremy = new Person("Jeremy Bearimy");
jeremy.greet();
// jeremy.#name error: 私有属性无法在类外访问


// 私有属性在当前类中是惟一的
class C {
  #foo = 10;
  cHelper() {
    return this.#foo;
  }
}

class D extends C {
  #foo = 20;
  dHelper() {
    return this.#foo;
  }
}
let instance = new D();
// 'this.#foo' refers to a different field within each class.
console.log(instance.cHelper()); // prints '10'，不会被重写
console.log(instance.dHelper()); // prints '20'