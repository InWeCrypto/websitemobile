import "../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import CommonTitle from "../components/common-title/";

export default class AppComponent extends Component {
	constructor() {
		super();

		this.state = {
			title: "所有资讯"
		};
	}
	componentDidMount() {
		document.title = this.state.title;
	}
	render() {
		const state = this.state;
		return (
			<Router>
				<div>
					<CommonTitle title={state.title} />
					<div className="list-box">
						<div className="group">
							<div className="group-title">222</div>
							<div className="group-cont">22</div>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}
ReactDOM.render(<AppComponent />, document.querySelector("#app"));
