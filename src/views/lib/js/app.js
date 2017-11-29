// 项目公共逻辑和方法
import "whatwg-fetch";
import Promise from "promise-polyfill";
import $ from "jquery";

if (!window.Promise) {
	window.Promise = Promise;
}

// eg: url = 'http://inwecryptocms.app/ad'
export const getData = function(url, method, param, header) {
	let p = {};
	let h = {};
	var user = window.localStorage.getItem("userInfo");
	if (user) {
		h.Authorization = user.token;
	}
	if (arguments[1] && typeof arguments[1] === "string") {
		p.method = arguments[1];
		if (arguments[3] && typeof (arguments[3] === "object")) {
			h = header;
		}
		p.headers = Object.assign(
			{},
			{
				"Content-Type": "application/json"
			},
			h
		);
		p.body = JSON.stringify(param);
	}
	return new Promise((resolve, reject) => {
		fetch(url, p)
			.then(res => {
				var resD = res.json();
				if (res.ok) {
					resolve(resD);
				} else {
					throw new Error(res.status);
				}
			})
			.catch(e => {
				console.log("check your url/network");
			});
	});
};
export const getFile = url => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(res => {
				resolve(res.text());
			})
			.catch(e => {
				console.log("get file fail;");
			});
	});
};
var formatData = function(obj) {
	var k = 0;
	var str = "";
	if (obj && typeof obj === "object") {
		for (var key in obj) {
			if (k == 0) {
				str += "?";
			} else {
				str += "&";
			}
			str += key + "=" + obj[key];
			k++;
		}
	}
	return str;
};
