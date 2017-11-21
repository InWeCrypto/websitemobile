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
	toggleMenu() {
		this.setState({
			showMore: !this.state.showMore
		});
	}
	menuClick() {
		this.setState({
			showMore: false
		});
	}
	render() {
		const state = this.state;
		return (
			<div className="common-title">
				<span className="title-txt">测试title</span>
				<div className="menu-box">
					<span
						className="menu-btn"
						onClick={this.toggleMenu.bind(this)}
					/>
					{state.showMore && (
						<div
							className="menu-list"
							onClick={this.menuClick.bind(this)}
						>
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
