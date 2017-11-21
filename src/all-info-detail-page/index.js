import "../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import CommonTitle from "../components/common-title/";

import uncollect from "../lib/img/uncollect.png";
import collected from "../lib/img/collected.png";
export default class AppComponent extends Component {
	constructor() {
		super();
		this.state = {
			title: "资讯详情"
		};
	}
	componentDidMount() {
		document.title = this.state.title;
	}
	render() {
		let state = this.state;
		return (
			<Router>
				<div>
					<CommonTitle showReturn={true} title={state.title} />
					<div className="detail-container">
						<div className="detail-title">山鸡山鸡</div>
						<div className="detail-info">
							<span className="txt">2017-09-09 11:11:11</span>
							<span className="txt">阅读：23</span>
							<span className="txt">回复：22</span>
							<span className="txt">
								收藏&nbsp;&nbsp;
								<img className="collect" src={uncollect} />
							</span>
						</div>
						<div className="detail-cont">山鸡山鸡咯咯哒</div>
					</div>
				</div>
			</Router>
		);
	}
}
ReactDOM.render(<AppComponent />, document.querySelector("#app"));
