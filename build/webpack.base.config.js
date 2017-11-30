var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var config = require("../config/entries.js");
var path = require("path");
var entries = {};
config.entries.forEach(function(entry) {
	entries[entry.entryName] = entry.entry;
});
var rootPath = path.resolve(__dirname, "../src");
// 第三方依赖 js & css
// 必须是所有页面都使用到的第三方库
// 可配合插件 ProvidePlugin 省去依赖声明
//  var pace = require("../src/views/lib/js/pace");
entries.vendor = [
	"whatwg-fetch",
	"jquery",
	"normalize.css",
	"babel-polyfill",
	rootPath + "/views/lib/js/global.js"
];
entries.pace = [
	rootPath + "/views/lib/css/pace.theme.css",
	rootPath + "/views/lib/js/pace.js"
];
function resolve(dir) {
	return path.join(__dirname, "..", dir);
}

var webpackConfig = {
	entry: entries,
	resolve: {
		alias: {
			src: path.resolve(__dirname, "../src/views/"),
			app: path.resolve(__dirname, "../src/views/lib/")
		}
	},
	module: {
		noParse: /jquery/,
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: "underscore-template-loader"
				}
			},

			{
				test: /\.css|less$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"less-loader"
				]
			},
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				include: [resolve("src")]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name:
								config.assetsSubDirectory +
								"/img/[name].[hash:9].[ext]",
							publicPath:
								process.env.NODE_ENV === "development"
									? config.dev.assetsPublicPath
									: config.build.assetsPublicPath
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name:
								config.assetsSubDirectory +
								"/font/[name].[hash:9].[ext]",
							publicPath:
								process.env.NODE_ENV === "development"
									? config.dev.assetsPublicPath
									: config.build.assetsPublicPath
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin({
			banner:
				"hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
		})
	]
};

var htmlMinify = {
	caseSensitive: true,
	collapseBooleanAttributes: true,
	collapseInlineTagWhitespace: true,
	collapseWhitespace: true,
	minifyJS: true,
	minifyCSS: true,
	minifyURLs: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeEmptyAttributes: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true,
	useShortDoctype: true
};
config.entries.forEach(function(entry) {
	var options = {
		filename: entry.filename,
		template: entry.template,
		chunks: ["manifest", "pace", "vendor", "app", entry.entryName],
		env:
			process.env.NODE_ENV === "development"
				? JSON.parse(config.dev.env.NODE_ENV)
				: JSON.parse(config.build.env.NODE_ENV)
	};

	if (process.env.NODE_ENV === "production") {
		options.minify = htmlMinify;
	}

	webpackConfig.plugins.push(new HtmlWebpackPlugin(options));
});

module.exports = webpackConfig;
