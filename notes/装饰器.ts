{
  /* 
      装饰器生效顺序，从后到前
  */
  function setName() {
    console.log('setName'); // 1
    return (target: new () => any) => {
      console.log('setName', target);   // 4
    }
  }
  function setAge() {
    console.log('setAge');  // 2
    return (target: new () => any) => {
      // target就是被装饰的类：ClassDec
      console.log('setAge', target);       // 3
    }
  }
  @setName()
  @setAge()
  class ClassDec {

  }
}

{
  // 带参数
  function setName(name: string) {
    console.log('name', name);
    return function (target: new () => any) {
      console.log('target', target.name); // 类名：ClassDec
    }
  }

  @setName('Madao')
  class ClassDec {

  }
}

{
  function addName(target: new () => any) {
    console.log('target', target);  // 被修饰的类
    target.prototype.name = 'Madao';
  }

  // addName没有返回函数，所以不需要调用
  @addName
  class ClassDec { }

  // 类型合并
  interface ClassDec {
    name: string;
  }


  const dec = new ClassDec();
  console.log(dec.name);
}


{
  // target === Greeter
  // new(...args: any[]) => {} 指构造函数类型
  type G = new (...args: any[]) => {};
  function classDecorator<T extends G>(target: T) {
    // 返回Greeter的子类，这个子类将代替Greeter
    // 如果直接返回一个类，那Greeter将被取缔
    return class extends target {
      public newProperty = 'new property'
      public hello = 'override'
    }
  }


  @classDecorator
  class Greeter {
    public property = 'property'
    public hello: string
    constructor(m: string) {
      this.hello = m
    }
  }
  // 这里其实new的是装饰器返回的子类，hello === override
  console.log(new Greeter('world'))
}


{
  // 方法装饰器
  function enumerables(bool: boolean) {
    /* 
      target：被修饰目标所属类的原型对象
      propertyName: 被修饰的属性或方法名
      descriptor：属性描述符
    */
    return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
      console.log(target) // ClassF.prototype
      console.log(propertyName) // 'getAge'
      descriptor.enumerable = bool; // 修改getAge的enumerable
    }
  }


  class ClassF {
    constructor(public age: number) { }
    @enumerables(false)
    public getAge() {
      return this.age;
    }
  }
}


{
  // 方法装饰器改
  function enumerables(bool: boolean): any {
    return (target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
      // 这个返回值将取代getAge的属性描述对象
      return {
        /* 
            这里value设置成方法，是因为被修饰的getAge是个方法
            如果直接value: 'not agess',
            那么getAge将变成普通属性
            console.log(cf.getAge); // not agess
        */
        value() {
          return 'not age'
        },
        enumerable: bool
      }
    }
  }


  class ClassF {
    constructor(public age: number) { }
    @enumerables(false)
    public getAge() {
      return this.age;
    }
  }

  const cf = new ClassF(18);
  console.log(cf.getAge()); // not age

}

{
  // 方法装饰器用于存取器，不能同时用于getter setter
  function enumerable(bool: boolean) {
    return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
      console.log(target);
      descriptor.enumerable = bool
    }
  }
  class ClassG {
    private _name: string
    constructor(name: string) {
      this._name = name
    }
    @enumerable(true)
    get name() {
      return this._name
    }

    // @enumerable(true) error  不能同时用于getter setter
    set name(name) {
      this._name = name
    }
  }

  const g = new ClassG('aa');
}

{
  // 属性装饰器
  function printPropertyName(target: any, propertyName: string) {
    console.log(propertyName)
  }
  class ClassH {
    @printPropertyName
    public name: string
  }
}

{
  // 参数装饰器
  function required(target: any, propertName: string, index: number) {
    /* 
        target：ClassI的原型对象
        propertName：参数所在的方法名getInfo
        index：参数的位置索引
    */
    console.log(`修饰的是${propertName}的第${index + 1}个参数`)
  }
  class ClassI {
    public name: string = 'lison'
    public age: number = 18
    public getInfo(prefix: string, @required infoType: string): any {
      return prefix + ' ' + this[infoType]
    }
  }
  interface ClassI {
    [key: string]: string | number | Function
  }
  const classI = new ClassI()
  classI.getInfo('hihi', 'age')
}