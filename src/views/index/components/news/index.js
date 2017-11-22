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
		const news = this.props.newsList;
		return (
			<div className="news-box">
				<div className="title">News</div>
				<div className="news">
					<Slider {...settings}>
						{news &&
							news.length > 0 &&
							news.map((item, index) => {
								return (
									<div className="cont" key={index}>
										<div className="title">
											{item.title}
										</div>
										<div className="intro">{item.desc}</div>
									</div>
								);
							})}
					</Slider>
				</div>
				<div className="more" />
			</div>
		);
	}
}
