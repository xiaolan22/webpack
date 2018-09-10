/*
 * @Author: 徐长剑
 * @Description: 构建工具方法
 * @Date: 2018-07-31 17:26:05
 * @Last Modified time: 2018-07-31 17:26:05
 */

const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";
/**
 * @description 将代码注入到html页面中
 * @date 2018-08-14
 * @class HtmlWebpackPluginExc
 * @param {Array} [jsPath] 需要注入的js路径
 */
class HtmlWebpackPluginExc {
    constructor(options = { jsPath: [] }) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap("HtmlWebpackPluginExc", compilation => {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
                "HtmlWebpackPluginExc",
                (data, cb) => {
                    // var _html = data.html.split("<body>");
                    // _html.splice(1, 0, '<body>\n<div class="loading"></div>');
                    // data.html = _html.join("");

                    this.options.jsPath.map(k => {
                        data.assets.js.unshift(k);
                    });
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = {
    /**
     * @description 生成多页面入口的js 匹配规则index.js
     * @date 2018-07-31
     * @returns {Object} 返回入口js
     */
    getEntry() {
        var files = glob.sync(path.resolve(__dirname, "../../src/entry/**/*.js"));
        var newEntries = {};
        files.forEach(function(pathUrl) {
            if (/index\.js$/.test(pathUrl)) {
                let _Aname = pathUrl.split("/"),
                    _name = _Aname[_Aname.length - 2];
                newEntries[_name] = pathUrl;
            }
        });
        return newEntries;
    },
    /**
     * @description 根据入口js 生成html页面
     * @param {Object} [entrys] 入口js
     * @returns {Array} 返回多个htmlWebpackPlugin
     */
    htmlPlugins(entrys = {}) {
        let _Ahtmls = [];
        var files = glob.sync(path.resolve(__dirname, "../../src/html/**/*.html"));
        for (let k in entrys) {
            files.map(h => {
                let _Aname = h.split("/"),
                    _name = _Aname[_Aname.length - 1];
                if (_name.split(".")[0] == k) {
                    // if(_name.split('.')[0] == k.split('/')[1]){
                    _Ahtmls.push(
                        new htmlWebpackPlugin({
                            title: "盒饭LIVE-直击娱乐 偶像工厂",
                            filename: `${k}.html`,
                            template: h,
                            favicon: path.resolve(
                                __dirname,
                                "../../static/favicon.ico"
                            ),
                            meta: {
                                viewport:
                                    "width=device-width, initial-scale=1, shrink-to-fit=no",
                                keywords:
                                    "盒饭，盒饭LIVE，盒饭live，明星动态，直播，手机直播，盒饭app",
                                description:
                                    "通过盒饭LIVE实时了解明星动态、互动交流、欣赏优质视频演艺，盒饭LIVE与中国各大影视、音乐传媒公司及演艺经纪公司建立深度合作，拥有国际一流演艺活动策划团队，无论是知名主播还是超级巨星都可以在这里邂逅。",
                                renderer: "webkit"
                            },
                            hash: true, //防止缓存
                            cache: true, //仅在文件被更改时才发出文件
                            chunks: ["vendors", k],
                            inject: "body",
                            minify: devMode
                                ? {}
                                : {
                                removeAttributeQuotes: true, //压缩 去掉引号
                                caseSensitive: false, //是否大小写敏感
                                collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled
                                conservativeCollapse: true, //折叠成一行
                                collapseWhitespace: true //是否去除空格
                            }
                        })
                    );
                }
            });
        }
        return _Ahtmls;
    },
    /**
     * @description 处理css less sass loader 提取css postcss 压缩css
     * @date 2018-07-31
     * @param {string} [type] 判断需要处理的loader
     * @returns
     */
    cssLoader(type = "css") {
        let typeCollection = {
                css: {
                    test: /\.css$/
                },
                less: {
                    test: /\.less$/
                },
                sass: {
                    test: /\.(sa|sc)ss$/
                }
            },
            loader = {
                test: typeCollection[type]["test"],
                exclude: /node_modules/,
                // include: /(src)/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            minimize: !devMode
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: devMode
                                ? []
                                : [
                                require("postcss-cssnext")(), //给css代码 添加浏览器兼容
                                require("postcss-sprites")({
                                    spritePath:
                                        "./dist/assets/img/sprites",
                                    //   匹配需要转化成雪碧图的图片
                                    filterBy: function(image) {
                                        if (
                                            image.url.indexOf(
                                                "/sprites/"
                                            ) === -1
                                        ) {
                                            return Promise.reject();
                                        }
                                        return Promise.resolve();
                                    },
                                    // 将同一个文件下的图片 打包到雪碧图
                                    groupBy: function(image) {
                                        let groups = null,
                                            groupIndex = 0,
                                            groupName = "icon";

                                        groups = image.url.split("/");
                                        groupIndex = groups.findIndex(
                                            item => item === "sprites"
                                        );
                                        groupName =
                                            groups[groupIndex - 1];
                                        return Promise.resolve(groupName);
                                    }
                                })
                            ]
                        }
                    },
                    type === "less"
                        ? {
                        loader: "less-loader"
                    }
                        : type === "sass"
                        ? {
                        loader: "sass-loader"
                    }
                        : {}
                ]
            };
        if (type === "css") loader.use.pop();
        return loader;
    },
    HtmlWebpackPluginExc
};
