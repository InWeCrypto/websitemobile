import "./index.less";
import React, { Component } from "react";
import Slider from "react-slick";

export default class Banner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setting: {
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				arrows: false
			}
		};
	}

	render() {
		const settings = this.state.setting;
		const banner = this.props.bannerList;
		return (
			<div className="banner-box">
				<Slider {...settings}>
					{banner &&
						banner.length > 0 &&
						banner.map((item, index) => {
							return (
								<div key={index}>
									<a href={item.url}>
										<img src={item.img} />
									</a>
								</div>
							);
						})}
				</Slider>
			</div>
		);
	}
}
