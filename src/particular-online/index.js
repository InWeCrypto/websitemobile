import "../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import CommonTitle from "../components/common-title/";
import RealTime from "./components/realtime/";
import Trade from "./components/trade/";
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
						<div className="realtime">
							<RealTime />
						</div>
						<div className="k-box" />
						<div className="trade-box">
							<Trade />
						</div>
						<div className="intro-box">
							<div className="intro-nav">
								<div className="intro-navbtn cur">2</div>
								<div className="intro-navbtn">2</div>
								<div className="intro-navbtn">2</div>
								<div className="intro-navbtn">2</div>
							</div>
							<iframe className="intro-cont" />
						</div>
						<div className="news-box">11</div>
					</div>
				</div>
			</Router>
		);
	}
}
ReactDOM.render(<AppComponent />, document.querySelector("#app"));
