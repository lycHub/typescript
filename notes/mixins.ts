{
  interface ObjectA {
    a: string
}
interface ObjectB {
    b: string
}
let Aa: ObjectA = {
    a: 'a',
}
let Bb: ObjectB = {
    b: 'b',
}

// 对象的混入
let AB: ObjectA & ObjectB = Object.assign(Aa, Bb)
}


{
  class ClassAa {
    public isA: boolean
    public funcA() {}
}
class ClassBb {
    public isB: boolean
    public funcB() {}
}

// 把类当接口继承，并实现接口的所有方法和属性
class ClassAB implements ClassAa, ClassBb {
    public isA: boolean = false
    public isB: boolean = false
    public funcA: () => void
    public funcB: () => void
    constructor() {}
}
function mixins(base: any, from: any[]) {
    from.forEach((fromItem) => {
      // getOwnPropertyNames(fromItem.prototype)获取类原型上的所有属性和方法
        Object.getOwnPropertyNames(fromItem.prototype).forEach((key) => {
            console.log(key)  // constructor 、funcA   constructor funcB
            base.prototype[key] = fromItem.prototype[key]
        })
    })
}
mixins(ClassAB, [ClassAa, ClassBb])
const ab = new ClassAB()
console.log(ab)

}