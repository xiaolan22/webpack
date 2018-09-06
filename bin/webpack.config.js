/**
 * Created by songpeilan on 2018/8/30.
 */
let path = require('path')
let dirname = path.join(__dirname, '../')
const Utils = require("./utils/utils");
const entrys = Utils.getEntry();
const htmls = Utils.htmlPlugins(entrys);
console.log('entrys',entrys)
const _env = process.env.NODE_ENV;
const HtmlWebpackPluginExc = Utils.HtmlWebpackPluginExc;
const _config = require("./config");

console.log(path.normalize("../src//js/index.js"))
console.log(path.join(dirname, "../src/js/index.js",'../'))
console.log(path.resolve(dirname, "../src/js/index.js"))
console.log(path.isAbsolute("/songpeilan/Documents/github/rhinocerosTeam/src/js/index.js"))
console.log(path.relative(dirname, "../src/js/index.js"))
console.log(path.extname("../src/js/index.js"))
console.log(path.parse("../src/js/index.js"))
console.log(path.format({ root: '',
    dir: '../src/js',
    base: 'index.js',
    ext: '.js',
    name: 'index' }))



module.exports = {
    entry: entrys,
    output: {
        library: "someLibName",
        libraryTarget: "umd",
        auxiliaryComment: {
            root: "Root Comment",
            commonjs: "CommonJS Comment",
            commonjs2: "CommonJS2 Comment",
            amd: "AMD Comment"
        },
        path: path.join(dirname, 'dist'), // 出口目录，dist文件
        filename: '[name].[hash].js' //这里name就是打包出来的文件名，因为是单入口，就是main，多入口下回分解
    },
    plugins:[
        ...htmls,
        // new HtmlWebpackPluginExc({
        //     jsPath: _config['development']["jsPath"]
        // })
    ],
    devServer: {
        contentBase: path.join(dirname, "dist"), //静态文件根目录
        port: 9090, // 端口
        host: 'localhost',
        overlay: true,
        compress: true // 服务器返回浏览器的时候是否启动gzip压缩
    }
}
