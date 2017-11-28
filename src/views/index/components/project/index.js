import "./index.less";
import React, { Component } from "react";
import Slider from "react-slick";
import pic from "../../../lib/img/menubtn.png";
import $ from "jquery";

class ChainList {
	constructor() {
		this._this = {};
		this.length = 0;
	}
	add(item) {
		this._this[item.cur] = {};
		this._this[item.cur]["data"] = item.data;
		this._this[item.cur]["type"] = item.type;
		this._this[item.cur]["id"] = item.cur;
		if (item.prev) {
			this._this[item.cur]["prev"] = item.prev;
			this._this[item.prev]["next"] = item.cur;
		}
		this.length++;
	}
	findByType(id, type) {
		if (!this._this[id] || !this._this[id].type) {
			return;
		}
		if ($.inArray(this._this[id].type, type) == -1) {
			return this.findByType(this._this[id].next, type);
		} else {
			return this._this[id];
		}
	}
	remove(id) {
		let item = this._this[id];
		if (item.prev) {
			this._this[item.prev].next = item.next;
		}
		if (item.next) {
			this._this[item.next].prev = item.prev;
		}
		delete this._this[id];
		this.length--;
	}
	getList() {
		return this._this;
	}
	getLength() {
		return this.length;
	}
}

export default class project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemW: "0px",
			littleW: "0px"
		};
	}
	componentDidMount() {
		this.setW();
	}
	setW() {
		var w = window.innerWidth;
		var iw = (w - 5 * 2 - 3) / 2;
		var lw = (iw - 3) / 2;
		this.setState({
			itemW: iw + "px",
			littleW: lw + "px"
		});
	}
	setData(data) {
		if (!data || !(data instanceof Array)) {
			return [];
		}
		var list = new ChainList();
		let newArr = [];
		let curIndex = 0;
		data.map((item, index) => {
			list.add({
				data: item,
				prev: index - 1 < 0 ? null : data[index - 1].id,
				cur: item.id,
				type: item.grid_type
			});
		});
		let list1 = list.getList();
		let keys = Object.keys(list1);
		var newList = [];
		data.map((item, index) => {
			if (!list1[item.id]) {
				return;
			}
			let newArr = [];
			if (item.grid_type !== 4) {
				let s = this.getLittle(newArr, list, list1, item);
				if (s) {
					newArr.push(s);
				}
			} else {
				newArr.push(item);
				list.remove(item.id);
			}
			newList.push(newArr);
		});
		return newList;
	}
	getLittle(arr, list, list1, item, level) {
		if (!level) {
			level = 0;
		}
		if (level >= 4) {
			return;
		}
		arr.push(item);
		let id = item.id;
		level++;
		if (list1[id].next) {
			let i = list.findByType(list1[id].next, [1, 2, 3]);
			if (!i) {
				list.remove(id);
				return;
			}
			this.getLittle(arr, list, list1, i.data, level);
		}
		list.remove(id);
		return;
	}
	setTypeClass(type) {
		if (type == 4) {
			return "big";
		} else {
			return "little";
		}
	}
	setFixed(num) {
		return (parseInt(num * 10 * 10, 10) / 100).toFixed(2);
	}

	render() {
		const { projectList, timepriceData } = this.props;
		const listData = this.setData(projectList);

		let settings = {
			dots: false,
			infinite: true,
			autoplay: true,
			speed: 500,
			autoplaySpend: 100,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
			<div className="project">
				<div className="project-title">
					<span className="line" />
					<span className="txt">项目</span>
					<span className="line" />
				</div>
				<div className="project-box">
					{listData &&
						listData.map((v, i) => {
							return (
								<div
									className="item"
									style={{
										width: this.state.itemW,
										height: this.state.itemW
									}}
									key={i}
								>
									{v &&
										v.map((item, index) => {
											return (
												<div
													className={this.setTypeClass(
														item.grid_type
													)}
													style={{
														width: this.state
															.littleW,
														height: this.state
															.littleW
													}}
													key={index}
												>
													{/* 轮播图 */}
													{item.type === 2 && (
														<div
															className="slider"
															style={{
																background:
																	item.color
															}}
														>
															<Slider
																{...settings}
															>
																{item.carousels &&
																	item
																		.carousels
																		.length >
																		0 &&
																	item.carousels.map(
																		(
																			item,
																			index
																		) => {
																			return (
																				<div
																					key={
																						item.id
																					}
																				>
																					<a className="item-link">
																						<img
																							src={
																								item.img
																							}
																						/>
																					</a>
																					<div className="slideControl">
																						{
																							item.title
																						}
																					</div>
																				</div>
																			);
																		}
																	)}
															</Slider>
														</div>
													)}
													{/* 视频轮播 */}
													{item.type === 4 && (
														<div className="slider slider-video">
															<Slider
																{...settings}
															>
																{/* {item.videos &&
                                                            // item.videos.length > 0 &&
                                                            item.videos.map(
                                                                (item, index) => {
                                                                    return ( */}
																<div
																// key={
																// 	item.id
																// }
																>
																	<a className="item-link">
																		{/* src={item.img} */}
																		<img src="http://whalewallet.oss-cn-hongkong.aliyuncs.com/ads/banner2.png" />{" "}
																		{/* 测试数据，有了数据就把上下注释去除即可 */}
																	</a>
																	<div className="slideControl">
																		{/* {
                                                                                    item.title
                                                                                } */}
																		视频轮播
																	</div>
																</div>
																{/* );
                                                                }
                                                            )} */}
															</Slider>
														</div>
													)}
													{/* 其他 */}
													{item.type !== 4 &&
														item.type !== 2 && (
															<a
																className="a"
																href={
																	"./particular-online/#/?id=" +
																	item.id
																}
																style={{
																	background:
																		item.color
																}}
															>
																{item.type ==
																	5 &&
																	timepriceData[
																		item.id
																	] && (
																		<span className="lefttop">
																			{this.setFixed(
																				timepriceData[
																					item
																						.id
																				]
																					.price
																			)}
																		</span>
																	)}
																{item.type ==
																	5 &&
																	timepriceData[
																		item.id
																	] && (
																		<span className="righttop">
																			{this.setFixed(
																				timepriceData[
																					item
																						.id
																				][
																					"24h_change"
																				]
																			)}
																		</span>
																	)}
																{item.type ==
																	6 && (
																	<span className="lefttop">
																		Upcoming
																	</span>
																)}
																{item.type ==
																	7 && (
																	<span className="lefttop">
																		ACTIVE
																	</span>
																)}
																{item.type ==
																	8 && (
																	<span className="lefttop">
																		Upcoming
																	</span>
																)}
																<img
																	className="img"
																	src={
																		item.img
																	}
																/>
																<span className="en-name">
																	{
																		item.en_name
																	}
																</span>
															</a>
														)}
												</div>
											);
										})}
								</div>
							);
						})}
					<div className="clearfix" />
				</div>
			</div>
		);
	}
}
