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




{
	interface ClockInterface {
		tick(): void;
	}

	interface ClockConstructor {
    // 构造器签名
		new(hour: number, minute: number): ClockInterface;
	}

	function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
		return new ctor(hour, minute);
	}

	// 数字时钟
	class DigitalClock implements ClockInterface {
		constructor(hour: number, minute: number) {

		}
		tick() {
			console.log('beep beep');
		}
	}

	// 指针时钟
	class AnalogClock implements ClockInterface {
		constructor(hour: number, minute: number) {

		}
		tick() {
			console.log('da da');
		}
	}

	const digital = createClock(DigitalClock, 12, 22);
	const analog = createClock(AnalogClock, 18, 44);
	
	
}