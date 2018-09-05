/*
 * @Author: 徐长剑
 * @Description: webpack 资源路径统一配置文件
 * @Date: 2018-08-14 11:00:05
 * @Last Modified time: 2018-08-14 11:00:05
 */

var path = require("path");

module.exports = {
    production: {
        env: "production",
        staticRootFrom: path.resolve(__dirname, "../static"),
        staticRootTo: path.resolve(__dirname, "../dist/static"),
        publicPath: "/",
        outPath: path.resolve(__dirname, "../dist"),
        jsPath: [
            // // 只在移动端使用
            // "http://webstatic.hefantv.com/h5/common/common.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/common/wxShare.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/lib/zepto_min.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/lib/vconsole.min.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/common/polyfill.js" +
            //     "?timestamp=" +
            //     Date.now()
        ]
    },
    preproduction: {
        env: "preproduction",
        staticRootFrom: path.resolve(__dirname, "../static"),
        staticRootTo: path.resolve(__dirname, "../dist/static"),
        publicPath: "/",
        // publicPath: "http://localhost.hefantv.com:1317/dist/",
        outPath: path.resolve(__dirname, "../dist"),
        jsPath: [
            // 只在移动端使用
            // "http://webstatic.hefantv.com/h5/common/common.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/common/wxShare.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/lib/zepto_min.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/lib/vconsole.min.js" +
            //     "?timestamp=" +
            //     Date.now(),
            // "http://webstatic.hefantv.com/h5/common/polyfill.js" +
            //     "?timestamp=" +
            //     Date.now()
        ]
    },
    testing: {
        env: "testing",
        staticRootFrom: path.resolve(__dirname, "../static"),
        staticRootTo: path.resolve(__dirname, "../dist/static"),
        publicPath: "/",
        outPath: path.resolve(__dirname, "../dist"),
        jsPath: [
            //     // 只在移动端使用
            //     "http://testwebstatic.hefantv.com/h5/common/common.js",
            //     "http://testwebstatic.hefantv.com/h5/common/wxShare.js",
            //     "http://testwebstatic.hefantv.com/h5/lib/zepto_min.js",
            //     "http://testwebstatic.hefantv.com/h5/lib/vconsole.min.js",
            //     "http://testwebstatic.hefantv.com/h5/common/polyfill.js"
        ]
    },
    development: {
        env: "development",
        port: 1317,
        outPath: path.resolve(__dirname, "../dist"),
        staticRootFrom: path.resolve(__dirname, "../static"),
        staticRootTo: path.resolve(__dirname, "../dist/static"),
        publicPath: "/",
        jsPath: [
            // // 只在移动端使用
            // "http://testwebstatic.hefantv.com/h5/common/common.js",
            // "http://testwebstatic.hefantv.com/h5/common/wxShare.js",
            // "http://testwebstatic.hefantv.com/h5/lib/zepto_min.js",
            // "http://testwebstatic.hefantv.com/h5/lib/vconsole.min.js",
            // "http://testwebstatic.hefantv.com/h5/common/polyfill.js"
        ]
    }
};
