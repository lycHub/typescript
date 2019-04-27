{
  /*
  * protected修饰的属性，不能在类外使用，但能在子类使用
  * protected修饰的constructor，不能在类外使用，但能被继承
  * */
  class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
  }

// Employee 能够继承 Person
  class Employee extends Person {
    private department: string;
    
    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }
    
    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }
  
  let howard = new Employee("Howard", "Sales");
  let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
}


{
  /*
  * 在constructor里注册的参数，会自动视为类中的属性
  * public不能省
  * */
  class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {}
  }
  const a = new Octopus('Madao');
  console.log(a.name);
}


{
  /*
  * 存取器：
  * 存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。
  * 其次，只带有 get不带有 set的存取器自动被推断为 readonly。
  * 这在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。
  * */
  let passcode = "secret passcode";
  
  class Employee {
    private _fullName: string;
    
    get fullName(): string {
      return this._fullName;
    }
    
    set fullName(newName: string) {
      if (passcode && passcode == "secret passcode") {
        this._fullName = newName;
      }
      else {
        console.error("Error: Unauthorized update of employee!");
      }
    }
  }
  
  let employee = new Employee();
  employee.fullName = "Bob Smith";
  if (employee.fullName) {
    alert(employee.fullName);
  }
  
}


{
  /*
  * 抽象类不能被实例化，只能被继承
  * 抽象属性或方法一定要在子类实现
  * */
  abstract class Department {
    
    constructor(public name: string) {}
    protected abstract age: number;
    printName(): void {
      console.log('Department name: ' + this.name);
    }
    
    abstract printMeeting(): void; // 必须在派生类中实现
  }
  
  
  class AccountingDepartment extends Department {
    // protected age: number;  在派生类中必须实现抽象属性，修饰符可以不同
    constructor(readonly age: number) {
      super('Accounting and Auditing');
    }
    
    // 在派生类中必须实现抽象
    printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
    }
  
    generateReports(): void {
      console.log('Generating accounting reports...');
    }
  }
  
  // let department: Department; // 允许创建一个对抽象类型的引用
  // department = new Department(); // 错误: 不能创建一个抽象类的实例
  // department.generateReports(); // 错误: 方法在声明的抽象类中不存在
  
  let department:AccountingDepartment = new AccountingDepartment(22); // 允许对一个抽象子类进行实例化和赋值
  console.log(department.age);
  department.printName();
  department.printMeeting();
  department.generateReports();
}