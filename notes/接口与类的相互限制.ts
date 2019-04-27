class Control {
  protected state: any;
}

// 接口继承类，只继承类的成员
interface SelectableControl extends Control {
  select(): void;
}

/*
 类继承接口
* 必须实现state属性,修饰符可以不同
* 如果state是readonly、public  可以直接实现
* 如果state是protected，需要再继承Control才能实现
* 如果state是private，则不能实现
* */
class Img extends Control implements SelectableControl {
  state: number;
  select() { }
}