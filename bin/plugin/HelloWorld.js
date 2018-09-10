/**
 * Created by songpeilan on 2018/9/6.
 */

module.exports = class HelloWorld{
    constructor(){

    }
    apply(compiler){
        compiler.hooks('done', function() {
            console.log('==============>Hello World!');
        });
    }
}