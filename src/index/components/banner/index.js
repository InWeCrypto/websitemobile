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
		return (
			<div className="banner-box">
				<Slider {...settings}>
					<div>
						<img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1148113974,1195517441&fm=173&s=6CF121D044715B807219A4D3030060F1&w=218&h=146&img.JPG" />
					</div>
					<div>
						<img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=926442706,832000915&fm=173&s=859E7395C6336992489DFCE3030080B0&w=218&h=146&img.JPG" />
					</div>
				</Slider>
			</div>
		);
	}
}
