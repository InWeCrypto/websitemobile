var path = require("path");
var fs = require("fs");
var phone = require("./device");
var dirSrc = path.resolve(__dirname, "../src/views");

// 手机和PC分开
// if (phone !== null) {
//   dirSrc = path.resolve(__dirname, "../src/phone");
// } else {
//   dirSrc = path.resolve(__dirname, "../src/pc");
// }
// 单独处理项目首页
// 因为它的结构与其它页面不同
var entriesConfig = [
	{
		entryName: "index/index",
		entry: path.resolve(dirSrc, "index/index.js"),
		filename: "index.html",
		template: path.resolve(dirSrc, "index.html")
	}
];

var excludeDirs = ["lib", "index", "components"];
var dirPages = fs.readdirSync(dirSrc).filter(function(dirName) {
	return (
		excludeDirs.indexOf(dirName) === -1 &&
		fs.statSync(dirSrc + "/" + dirName).isDirectory()
	);
});
dirPages.forEach(pageWalk);

function pageWalk(pageName) {
	console.log(pageName);
	var filemark = "index";
	var pagePath = path.resolve(dirSrc, pageName);
	var files = fs.readdirSync(pagePath);
	var fileHTML = filemark + ".html";
	var fileJS = filemark + ".js";

	if (files.indexOf(fileJS) === -1) return;
	var filename = pageName + "/" + fileHTML;
	var isHasIndexHtml = fs.existsSync(filename);
	entriesConfig.push({
		entryName: pageName + "/" + filemark,
		entry: path.resolve(dirSrc, pageName, fileJS),
		filename: filename,
		template: isHasIndexHtml
			? path.resolve(dirSrc, filename)
			: path.resolve(dirSrc, "./index.html")
	});

	var subDirs = files
		.filter(function(file) {
			return fs.statSync(pagePath + "/" + file).isDirectory();
		})
		.map(function(dirName) {
			return pageName + "/" + dirName;
		});

	if (subDirs.length) {
		subDirs.forEach(pageWalk);
	}
}
module.exports = {
	entries: entriesConfig,
	assetsRoot: path.resolve(__dirname, "../dist"),
	assetsSubDirectory: "assets",
	commonsChunkName: ["app", "vendor", "manifest"],
	dev: {
		env: require("./dev.env.js"),
		assetsPublicPath: "/"
	},
	build: {
		env: require("./prod.env.js")
		// 可配置 CDN
		//assetsPublicPath: "/"
	}
};
