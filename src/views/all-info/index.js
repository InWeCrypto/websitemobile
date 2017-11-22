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
							<div className="group-cont">
								<div className="img-box">
									<img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3065766055,342841074&fm=173&s=7502D31C4225051538207F810300F08E&w=218&h=146&img.JPG" />
								</div>
								<div className="group-info">1</div>
							</div>
							<div className="group-ctrl">
								<span className="txt">
									2017-09-09 11:11:11 &nbsp;|&nbsp;
								</span>
								<span className="txt">阅读：435&nbsp;|&nbsp;</span>
								<span className="txt">回复：435&nbsp;|&nbsp;</span>
								<span className="txt">收藏</span>
							</div>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}
ReactDOM.render(<AppComponent />, document.querySelector("#app"));
