import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
export default class CommonTitle extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="common-title">
				<span className="title-txt">测试title</span>
				<div className="menu-box">
					<span className="menu-btn" />
					<div>sss</div>
				</div>
				<div className="return">
					<span className="returnbtn" />
				</div>
				<div className="common-search">ss</div>
			</div>
		);
	}
}
