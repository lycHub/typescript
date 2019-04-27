{
    interface Point {
        readonly x: number;
        readonly y: number;
    }

// xy是只读属性，初始化后再也不能修改
    let p1: Point = { x: 10, y: 20 };
    p1.x = 5; // error!
}


{
    /*
    * SquareConfig除了可以有color和width,
    * 还能有其它任意属性
    * */
    interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;    // 字符串索引签名
    }
    const config: SquareConfig = {
        color: 'aaa',
        width: 123,
        extra: 'bbb'    // 正因为有字符串索引签名，所以多一个属性也不会报错
    }
    // ps: 使用类型断言也可以绕过属性检测
    const config: SquareConfig = <SquareConfig>{
        color: 'aaa',
        width: 123,
        extra: 'bbb'
    }
}


{
    /*
    * 可索引的类型
    * */

    interface StringArray {
        // 索引是number，值是string
        [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];
    let myStr: string = myArray[0];
}


{
    /*
     * 接口里的函数属性，只需要声明函数的参数和返回值
     * */
    interface SearchFunc {
        ser: (source: string, subString: string) => boolean
        // 简写：
        // ser(ource: string, subString: string): boolean
    }

    let mySearch: SearchFunc = {
        ser: function(src: string, sub: string): boolean {
            let result = src.search(sub);
            return result > -1;
        }
    }


{
    /*
     *函数接口，只需要声明函数的参数和返回值
     * */
    interface SearchFunc {
        (source: string, subString: string): boolean
    }
  
    // type SearchFunc = (source: string, subString: string) => boolean;  // 别名写法
    /*
     * 实现函数接口需要直接赋值
     * 参数名不需要和接口定义的保持一致
     * */
    let mySearch: SearchFunc = function(src: string, sub: string): boolean {
        let result = src.search(sub);
        return result > -1;
    }
}

{
    /*
    * 混合类型：接口中既有属性，也有函数
    * 在使用JavaScript第三方库的时候，你可能需要像上面那样去完整地定义类型。
    * */
    interface Counter {
        (start: number): string;
        interval: number;

        // 定义一个名为reset的属性，值是一个函数
        // 也可以写成：reset: () => void
        reset(): void;
    }

    function getCounter(): Counter {
        // 实现函数接口需要直接赋值
        let counter = <Counter>function (start: number) { };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
}


{
    /*
     * 接口继承
     * */
    interface Shape {
        color: string;
    }

    interface PenStroke {
        penWidth: number;
    }

    interface Square extends Shape, PenStroke {
        sideLength: number;
    }

    let square = {} as Square;
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;
}