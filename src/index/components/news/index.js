import "./index.less";
import React, { Component } from "react";
import Slider from "react-slick";

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
	render() {
		const settings = this.state.setting;
		return (
			<div className="news-box">
				<div className="title">News</div>
				<div className="news">
					<Slider {...settings}>
						<div className="cont">
							<div className="title">张三丰</div>
							<div className="intro">2</div>
						</div>
						<div className="cont">2</div>
					</Slider>
				</div>
				<div className="more" />
			</div>
		);
	}
}
