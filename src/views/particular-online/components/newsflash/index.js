import "./index.less";
import React, { Component } from "react";
import $ from "jquery";

class NewsFlash extends Component {
	componentDidMount() {
		this.move();
	}
	move() {
		const b = $(".newsflash-box");
		let top = b.css("top");
		const h = $(".newsflash_cont").height();
		if (b.height() == h) {
			return;
		}
		setTimeout(() => {
			let to = parseInt(top, 10) - parseInt(h, 10);
			console.log(to);
			if (Math.abs(to) == b.height()) {
				to = 0;
			}
			b.css("top", to);
			this.move();
		}, 3000);
	}
	render() {
		const { newsList } = this.props;
		return (
			<div className="newsflash">
				<div className="newsflash_title">
					<span>
						项目<br />快讯
					</span>
				</div>
				<div className="newsflash_cont">
					<div className="newsflash-box">
						{newsList &&
							newsList.map((item, index) => {
								return (
									<div key={index} className="newsflash_item">
										<span className="circle" />
										<span className="txt">
											{item.title}
										</span>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}
export default NewsFlash;
