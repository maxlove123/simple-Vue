 //创建观察对象
class Observer{
    constructor (data) {
        //提供一个解析方法，完成属性的分析和挟持
        this.observe( data )
    }
    //解析数据，完成对数据属性的挟持，控制对象属性的get和set
    observe (data) {
        //判断数据的有效性（必须是对象）
        if(!data || typeof data !== 'object'){
            return 
        }else{
            
            var keys = Object.keys(data) //将传递过来的data属性解析出来key，传递给defineReactive
            keys.forEach((key)=>{
                this.defineReactive(data,key,data[key])
            })
        }
        //真对当前对象的属性的重新定义


    }
    defineReactive (obj,key,val) {
        var dep = new Dep()
        Object.defineProperty(obj,key,{  //根据传递过来的属性obj和key，给obj添加属性，当属性值发生改变时，其他属性值也跟随发生改变
            //是否可遍历
            enumerable : true,
            //是否可配置
            configurable : false,
            //取值方法
            get () {
                //真对watcher创建时，直接完成发布订阅的添加
                var watcher = Dep.target;
                watcher && dep.addSub( watcher )
                return val;
            },
            //修改值
            set (newValue) {
                val = newValue; //将vm[name]属性获取到的值传递给set方法，设置val的值为vm[name]获取到的值
                
                dep.notify()
            }
        })
    }
}

//创建订阅发布者
    //1.管理订阅
    //2.集体通知
class Dep{
    constructor(){
        this.subs = [];
    }
    //添加订阅
    addSub (sub) {//其实是watcher对象
        this.subs.push(sub)
    }
    //集体通知
    notify () {
        this.subs.forEach((sub)=>{
            sub.update()
        })
    }
}

