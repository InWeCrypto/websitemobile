import "./index.less";
import React, { Component } from "react";

class NewsFlash extends Component {
	render() {
		return (
			<div className="newsflash">
				<div className="newsflash_title">
					<span>
						项目<br />快讯
					</span>
				</div>
				<div className="newsflash_cont">
					<span className="circle" />
					<span className="txt">
						快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯快讯
					</span>
				</div>
			</div>
		);
	}
}
export default NewsFlash;
