import "./index.less";
import React, { Component } from "react";
export default class CommonTitle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMore: false,
			showReturn: false
		};
	}
	render() {
		const state = this.state;
		return (
			<div className="common-title">
				<span className="title-txt">测试title</span>
				<div className="menu-box">
					<span className="menu-btn" />
					{state.showMore && (
						<div className="menu-list">
							<div className="menu-item cur">11</div>
							<div className="menu-item">11</div>
						</div>
					)}
				</div>
				{state.showReturn && (
					<div className="return">
						<span className="returnbtn" />
					</div>
				)}
			</div>
		);
	}
}
