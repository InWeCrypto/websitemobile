import "../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import CommonTitle from "../components/common-title/";

export default class AppComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "测试"
		};
	}
	componentDidMount() {
		document.title = this.state.title;
	}
	render() {
		return (
			<Router>
				<div className="particular-online">
					<CommonTitle />
					<div className="title">22</div>
					<div className="container">
						<div className="realtime">ssss 1</div>
					</div>
				</div>
			</Router>
		);
	}
}
ReactDOM.render(<AppComponent />, document.querySelector("#app"));
