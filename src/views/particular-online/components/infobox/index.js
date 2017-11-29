import "./index.less";
import React, { Component } from "react";

class InfoBox extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { infoData } = this.props;
		return (
			<div className="info-box">
				<div className="info-item info-title">
					<div className="info-name">ICO详情</div>
					<div className="info-cont">
						<a className="info-a" href="">
							官网>
						</a>
					</div>
				</div>
				{infoData &&
					infoData.length > 0 &&
					infoData.map((item, index) => {
						return (
							<div key={index} className="info-item">
								<div className="info-name">{item.name}</div>
								<div className="info-cont">{item.desc}</div>
							</div>
						);
					})}
			</div>
		);
	}
}
export default InfoBox;
