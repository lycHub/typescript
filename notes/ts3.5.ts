import '../styles/index.css';

/*
* 创建一个省略某些属性的对象
* */
type Person = {
  name: string;
  age: number;
  location: string;
};
// type QuantumPerson4 = keyof Person;  'name' | 'age' | 'location'


// 定义一个没有 location 属性的 Person

// 老写法
type RemainingKeys = Exclude<keyof Person, 'location'>;
type QuantumPerson = Pick<Person, 'name' | 'age'>;
type QuantumPerson2 = Pick<Person, RemainingKeys>;

// QuantumPerson2这种类型经常会用到，所以在ts3.5（不包含3.5）之前我们自己会封装type Omit
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type QuantumPerson3 = Omit<Person, 'location'>; // 和以上三种写法一个意思

const test: QuantumPerson3 = {
  name: 'zhangsan',
  age: 22,
  // location: 'ss'  error, location已被排除
};