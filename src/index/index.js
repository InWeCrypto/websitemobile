import "../lib/css/app.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import CommonTitle from "../components/common-title/";
import Banner from "./components/banner/";
import News from "./components/news";
export default class AppComponent extends Component {
	componentWillMount() {
		//document.title = "首页";
	}
	componentDidMount() {}
	render() {
		return (
			<Router>
				<div className="app">
					<CommonTitle />
					<Banner />
					<News />
				</div>
			</Router>
		);
	}
}
ReactDOM.render(<AppComponent />, document.querySelector("#app"));
