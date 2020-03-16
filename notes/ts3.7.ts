import '../styles/index.css';

/*
* Optional Chaining（foo?.bar）
* */
const foo = null;

// 假设以下逻辑
const x = foo === null || foo === undefined ? undefined : foo.bar.baz();

// 用Optional Chaining简写
const y = foo?.bar.baz();


if (foo && foo.bar && foo.bar.baz) {}

// 简写
if (foo?.bar?.baz) {}

// eg. 如果数组存在，就返回第一个元素，否则返回undefined
function tryGetFirstElement<T>(arr?: T[]) {
  return arr?.[0];
}

// eg. 如果函数存在，就执行该函数
function makeRequest(log?: (msg: string) => void) {
  log?.(`Request started at ${new Date().toISOString()}`);
  // roughly equivalent to
  //   if (log) {
  //       log(`Request started at ${new Date().toISOString()}`);
  //   }
}


/*
* Nullish Coalescing(??)
* 与 || 运算符不同，?? 只会判断null和undefined
* */
const bar = () => 'bar'
let a = foo ?? bar();
// 相当于：let a = foo !== null && foo !== undefined ? foo : bar();

// 与 || 的区别
const name = '';
const b = name || 'bb';
const c = name ?? 'cc';

console.log(b); // bb
console.log(c); // ''