import "./index.less";
import React, { Component } from "react";

export default class RealTime extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="realtime-box">
				<div className="nav">
					<div className="nav-box">
						<span className="navbtn">美元</span>
						<span className="navbtn cur">美元</span>
					</div>
				</div>
				<div className="detail">
					<div className="item">
						<div className="name">当前价格</div>
						<div className="value">2</div>
					</div>
					<div className="item">
						<div className="name">Volume</div>
						<div className="value">2</div>
					</div>
					<div className="item">
						<div className="name">24H-Change</div>
						<div className="value up">2</div>
					</div>
					<div className="item">
						<div className="name">24H最高值</div>
						<div className="value down">2</div>
					</div>
					<div className="item">
						<div className="name">24H最低值</div>
						<div className="value">2</div>
					</div>
				</div>
			</div>
		);
	}
}
