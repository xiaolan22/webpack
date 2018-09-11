/**
 * Created by songpeilan on 2018/8/30.
 */
let path = require('path')
let dirname = path.join(__dirname, '../')
const Utils = require("./utils/utils");
const entrys = Utils.getEntry();
const htmls = Utils.htmlPlugins(entrys);
console.log('entrys', entrys)
const _env = process.env.NODE_ENV;
const HtmlWebpackPluginExc = Utils.HtmlWebpackPluginExc;
const _config = require("./config");
const HelloWorldPlugin = require("./plugin/HelloWorld");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const _includeDir = /(src|hefantv_share)/;

const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

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
        filename: 'js/[name].[hash].js' //这里name就是打包出来的文件名，因为是单入口，就是main，多入口下回分解
    },

    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {//cacheGroups重写继承配置，设为false不继承
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:"vue-loader",
                include:_includeDir
            },
            /**
             * @description 转换处理es6语法
             * @date 2018-07-31
             */
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: _includeDir,
                use: "happypack/loader?id=happy-babel-js"
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                include: _includeDir,
                use: "happypack/loader?id=happy-babel-html"
            }
        ]
    },


    resolve:{
        /**
         * @description 定义可以省略的扩展名
         * @date 2018-07-31
         */
        extensions: [".js", ".json", ".jsx", ".less", ".css", ".vue", ".json"],

    },
    plugins: [
        ...htmls,

        /* 清空*/
        new CleanWebpackPlugin([path.join(dirname, "dist")]),
        //new HelloWorldPlugin()
        // new HtmlWebpackPluginExc({
        //     jsPath: _config['development']["jsPath"]
        // })
        /**
         * @description 开启一个进程去处理 babel-loader 转换es6语法
         * @date 2018-07-31
         */
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: "happy-babel-html",
            //如何处理  用法和loader 的配置一样
            loaders: ["html-loader"],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        }),
        new HappyPack({
            id: "happy-babel-js",
            loaders: ["babel-loader?cacheDirectory=true"],
            threadPool: happyThreadPool,
            verbose: true
        }),
    ],
    devServer: {
        contentBase: path.join(dirname, "dist"), //静态文件根目录
        port: 9090, // 端口
        host: 'localhost',
        overlay: true,
        compress: true // 服务器返回浏览器的时候是否启动gzip压缩
    }
}
