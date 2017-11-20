import "../lib/css/app.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import CommonTitle from "../components/common-title/";

export default class AppComponent extends Component {
	componentWillMount() {
		//document.title = "首页";
	}
	render() {
		return (
			<Router>
				<div className="app">
					<CommonTitle />
				</div>
			</Router>
		);
	}
}
ReactDOM.render(<AppComponent />, document.querySelector("#app"));
