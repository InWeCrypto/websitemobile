import "./index.less";
import React, { Component } from "react";
export default class Inews extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="inews">
				<div className="inews-title">INEW报道</div>
				<div className="inews-container">
					<div className="inews-nav">
						<div className="inews-navbox">
							<span className="inews-navbtn">视频</span>
							<span className="inews-navbtn cur">图文</span>
						</div>
					</div>
					<div className="inews-list">
						<div className="inews-item">
							<div className="img-box">
								<img src="" className="" />
							</div>
							<div className="inews-cont">
								<div className="item-title">太极张三丰</div>
								<div className="item-desc">是是是</div>
								<div className="item-time">
									2017-09-09 11:11:11
								</div>
							</div>
						</div>
						<div className="inews-item">
							<div className="img-box">
								<img src="" className="" />
							</div>
							<div className="inews-cont">
								<div className="item-title">太极张三丰</div>
								<div className="item-desc">是是是</div>
								<div className="item-time">
									2017-09-09 11:11:11
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
