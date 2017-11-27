import "./index.less";
import React, { Component } from "react";
export default class CommonTitle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.title ? props.title : "",
			isStation: props.isStation ? props.isStation : true,
			showMore: false,
			showReturn: props.showReturn ? props.showReturn : false
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
	returnClick() {
		window.history.go(-1);
	}
	render() {
		const state = this.state;
		return (
			<div className="common-titlebox">
				{this.props.isStation && <div className="common-titlebg" />}
				<div className="common-title">
					<span className="title-txt">{state.title}</span>
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
								<a href="../#/" className="menu-item">
									首页
								</a>
								<a href="../all-info/#/" className="menu-item">
									所有资讯
								</a>
								<a
									href="../evaluating/#/"
									className="menu-item"
								>
									Ico评测
								</a>
							</div>
						)}
					</div>
					{state.showReturn && (
						<div className="return">
							<span
								className="returnbtn"
								onClick={this.returnClick.bind(this)}
							/>
						</div>
					)}
				</div>
			</div>
		);
	}
}
