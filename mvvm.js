class MVVM {
    constructor( options ) {
        //缓存重要属性
        this.$vm = this;
        this.$el = options.el;
        this.$data = options.data; //将属性data传递给Observer，使observer解析data里面的属性

        //视图必须存在
        if( this.$el ) {
            //添加属性观察对象（实现数据挟持）
            new Observer( this.$data )
            //创建模板编译器，来解析视图
            this.$compiler = new TemplateCompiler(this.$el,this.$vm)
        }
    }
}