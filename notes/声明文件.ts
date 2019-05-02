{
    // 全局相关
    declare function setTitle(title: string | number): void;
    declare function getTitle(): string | number;
    declare const documentTitle: string | number;

    // 如果给某个类的原型上挂属性或方法，类似jq的插件机制
    String.prototype.getFirstName = function(){
        return this[0];
    }
    interface String {
        getFirstName(): string;
    }
}