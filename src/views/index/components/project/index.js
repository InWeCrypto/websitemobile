import "./index.less";
import React, { Component } from "react";
import Slider from "react-slick";
import pic from "../../../lib/img/menubtn.png";

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
		if (this._this[id].type != type) {
			return this.findByType(this._this[id].next, type);
		} else {
			return this._this[id];
		}
	}
	remove(id) {
		let item = this._this[id];
		let prev = this._this[this._this[id].prev];
		let next = this._this[this._this[id].next];
		if (prev) {
			prev.next = this._this[id].next;
		}
		if (next) {
			next.prev = this._this[id].prev;
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
			if (item.grid_type == 1) {
				newList.push(item);
				let id = item.id;
				if (list1[id].next) {
					let i2 = list.findByType(list1[id].next, 1);
					if (i2) {
						newList.push(i2.data);
						list.remove(i2.id);
					}
				}
				list.remove(item.id);
			} else {
				newList.push(item);
				list.remove(item.id);
			}
		});
		return newList;
	}
	setTypeClass(type) {
		if (type == 1) {
			return "item";
		}
		if (type == 2 || type == 3) {
			return "item item2";
		}
		if (type == 4) {
			return "item item1";
		}
	}
	render() {
		const { projectList } = this.props;
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
						listData.map((item, index) => {
							return (
								<div
									className={this.setTypeClass(
										item.grid_type
									)}
									key={index}
								>
									{/* 轮播图 */}
									{item.type === 2 && (
										<div className="slider">
											<Slider {...settings}>
												{item.carousels &&
													item.carousels.length > 0 &&
													item.carousels.map(
														(item, index) => {
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
									{item.type === 4 && (
										<div className="slider slider-video">
											<Slider {...settings}>
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
														<img src="http://whalewallet.oss-cn-hongkong.aliyuncs.com/ads/banner2.png" />
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
									<a
										className="a"
										href={
											"./particular-online/#/?id=" +
											item.id
										}
									>
										<img className="img" src={item.img} />
										<span className="en-name">
											{item.en_name}
										</span>
									</a>
								</div>
							);
						})}
					<div className="clearfix" />
				</div>
			</div>
		);
	}
}
