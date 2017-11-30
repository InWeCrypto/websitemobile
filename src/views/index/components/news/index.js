import "./index.less";
import React, { Component } from "react";
import $ from "jquery";

export default class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setting: {
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true
			}
		};
	}
	componentDidMount() {
		this.move.bind(this);
	}
	move() {
		if (!this.props.newsList || this.props.newsList.length <= 1) {
			return;
		}
		const b = $(".news-cont");
		let top = b.css("top");
		const h = $(".news").height();
		if (b.height() == h) {
			return;
		}
		let a = null;
		a = setTimeout(() => {
			let to = parseInt(top, 10) - parseInt(h, 10);
			if (Math.abs(to) == b.height()) {
				to = 0;
			}
			b.css("top", to);
			this.move();
		}, 3000);
	}
	render() {
		const settings = this.state.setting;
		const news = this.props.newsList;
		return (
			<div className="news-box">
				<div className="title">News</div>
				<div className="news">
					<div className="news-cont">
						{news &&
							news.map((item, index) => {
								return (
									<a
										key={index}
										className="a"
										href={item.url}
									>
										<span className="circle" />
										<span className="txt">
											{item.title}
										</span>
									</a>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}
