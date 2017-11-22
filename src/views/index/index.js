import "../lib/css/app.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import CommonTitle from "../components/common-title/";
import Banner from "./components/banner/";
import News from "./components/news";
import Project from "./components/project/";

import { getData } from "../lib/js/app";
import { requestUrl } from "../config/config";

export default class AppComponent extends Component {
	constructor() {
		super();
		this.state = {
			banner: null,
			neww: null
		};
	}
	getBannerData() {
		return new Promise((resolve, reject) => {
			getData(`${requestUrl}/home/ad`).then(data => {
				console.log(data);
				if (data.code === 4000) {
					this.setState({
						banner: data.data.list
					});
				} else {
					throw new Error(data.msg);
				}
			});
		});
	}
	getNewsData() {
		return new Promise((resolve, reject) => {
			getData(`${requestUrl}/home/news`).then(data => {
				if (data.code === 4000) {
					this.setState({
						news: data.data
					});
				} else {
					throw new Error(data.msg);
				}
			});
		});
	}
	componentWillMount() {
		this.getBannerData();
		this.getNewsData();
	}
	componentDidMount() {
		document.title = "首页";
	}
	render() {
		return (
			<Router>
				<div className="app">
					<CommonTitle title="首页" />
					<Banner bannerList={this.state.banner} />
					<News newsList={this.state.news} />
					<Project />
				</div>
			</Router>
		);
	}
}
ReactDOM.render(<AppComponent />, document.querySelector("#app"));
