import "./index.less";
import React, { Component } from "react";

export default class project extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="project">
				<div className="project-title">
					<span className="line" />
					<span className="txt">项目</span>
					<span className="line" />
				</div>
				<div className="project-box">
					<div className="item">1</div>
					<div className="item">1</div>
					<div className="item item1">1</div>
					<div className="item item2">1</div>
				</div>
			</div>
		);
	}
}
