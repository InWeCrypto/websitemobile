import "./index.less";
import React, { Component } from "react";
export default class Inews extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let { videoList, imgTxtList, inewsIndex, handClick } = this.props;
		const curClass = idx => {
			return idx === inewsIndex ? "inews-navbtn cur" : "inews-navbtn";
		};
		return (
			<div className="inews">
				<div className="inews-title">INEW报道</div>
				<div className="inews-container">
					<div className="inews-nav">
						{videoList &&
							imgTxtList &&
							videoList.length > 0 &&
							imgTxtList.length > 0 && (
								<div className="inews-navbox">
									<span
										className={curClass(0)}
										onClick={handClick.bind(this, 0)}
									>
										视频
									</span>
									<span
										className={curClass(1)}
										onClick={handClick.bind(this, 1)}
									>
										图文
									</span>
								</div>
							)}
					</div>
					<div className="inews-list">
						{inewsIndex == 0 &&
							videoList &&
							videoList.length > 0 &&
							videoList.map((item, index) => {
								return (
									<a
										href={item.url}
										className="inews-item"
										key={index}
									>
										<div className="img-box">
											<img src="" className="" />
										</div>
										<div className="inews-cont">
											<div className="item-title">
												{item.title}
											</div>
											<div className="item-desc">
												{item.desc}
											</div>
											<div className="item-time">
												{item.created_at}
											</div>
										</div>
									</a>
								);
							})}
						{inewsIndex == 1 &&
							imgTxtList &&
							imgTxtList.length > 0 &&
							imgTxtList.map((item, index) => {
								return (
									<a
										href={item.url}
										className="inews-item"
										key={index}
									>
										<div className="img-box">
											<img src={item.img} className="" />
										</div>
										<div className="inews-cont">
											<div className="item-title">
												{item.title}
											</div>
											<div className="item-desc">
												{item.desc}
											</div>
											<div className="item-time">
												{item.update}
											</div>
										</div>
									</a>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}
