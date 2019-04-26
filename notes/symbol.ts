{
  /* 
    Symbol是一种新的数据类型，
    所以不能使用new命令。
    也就是说，由于 Symbol 值不是对象，所以不能添加属性。
    基本上，它是一种类似于字符串的数据类型。
  */
  let s = Symbol();
  console.log("typeof s :", typeof s); // "symbol"
}

{
  /* 
    为了区分多个symbol, 可以传入参数
    如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，
    然后才生成一个 Symbol 值。
  */

  let s1 = Symbol("foo"); // Symbol(foo)
  let s2 = Symbol("bar"); // Symbol(bar)
  s1.toString(); // "Symbol(foo)"
  s2.toString(); // "Symbol(bar)"

  // 传入对象
  const obj = {
    toString() {
      return "abc";
    }
  };
  const sym = Symbol(obj);
  sym; // Symbol(abc)

  // symbol变量互不相等，即使传入的参数一样
  // 没有参数的情况
  let s1 = Symbol();
  let s2 = Symbol();

  s1 === s2; // false

  // 有参数的情况
  let s1 = Symbol("foo");
  let s2 = Symbol("foo");

  s1 === s2; // false
}

{
  // Symbol 只能转为字符串和布尔值
  let sym = Symbol("My symbol");

  String(sym); // 'Symbol(My symbol)'
  sym.toString(); // 'Symbol(My symbol)'
  Boolean(sym); // true
}

{
  // 除了转成字符串区分symbol外，还可以使用description属性(es2019才支持)
  const sym = Symbol("foo");
  sym.description; // "foo"
}

{
  /* 
  仔细观察OPERATES里的值是什么不重要，只要互不相等就行
  所以推荐使用symbol
*/

  const OPERATES = {
    LAST: "last",
    NEXT: "next",
    SAVETOLIST: "saveToList",
    SAVETODETAIL: "saveToDetail",
    CANCEL: "cancel",
    FREE: "free"
  };

  const OPERATES = {
    LAST: Symbol(),
    NEXT: Symbol(),
    SAVETOLIST: Symbol(),
    SAVETODETAIL: Symbol(),
    CANCEL: Symbol(),
    FREE: Symbol()
  };
}

{
  // symbol变量互不相等,所以用作对象属性时，能保证不会有重复属性
  let mySymbol = Symbol();

  // 第一种写法
  let a = {};
  a[mySymbol] = "Hello!";

  // 第二种写法
  let a = {
    [mySymbol]: "Hello!"
  };

  // 第三种写法
  let a = {};
  Object.defineProperty(a, mySymbol, { value: "Hello!" });

  // 以上写法都得到同样结果
  a[mySymbol]; // "Hello!"
}

{
  /* 
    当作为对象key值时，传统的
    for...in、Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()
    都不会返回Symbol属性名
    这时可用Object.getOwnPropertySymbols获取
  */

  const a = Symbol("a");
  const b = Symbol("b");
  let obj = {
    [a]: "Hello!",
    [b]: "world!"
  };

  const objectSymbols = Object.getOwnPropertySymbols(obj);

  console.log("objectSymbols :", objectSymbols); // [Symbol(a), Symbol(b)]

  // 另外，Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
  Reflect.ownKeys(obj); // [Symbol(a), Symbol(b)]
}


{
  /* 
    Symbol.for()返回指定的symbol值, 如果没找到，则返回一个新值
  */
  let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

console.log('s1 === s2 :', s1 === s2);


}