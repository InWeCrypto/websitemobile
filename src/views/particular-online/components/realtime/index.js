import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../../actions/particular-online/";

class RealTime extends Component {
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.time_price_index != this.props.time_price_index) {
			if (nextProps.time_price_index != null) {
				this.props.getTimePriceDataAction({
					url: this.props.time_price[nextProps.time_price_index]
						.current_url
				});
			}
		}
	}
	changeIndex(idx) {
		this.props.changeTimePriceIndexAction(idx);
	}
	render() {
		const { time_price, time_price_data } = this.props;
		const setCur = idx => {
			if (idx == this.props.time_price_index) {
				return "navbtn cur";
			} else {
				return "navbtn";
			}
		};
		const setcolor = str => {
			if (str.toString().indexOf("-") != -1) {
				return "value down";
			} else {
				return "value up";
			}
		};
		return (
			<div className="realtime-box">
				<div className="nav">
					<div className="nav-box">
						{time_price &&
							time_price.length > 0 &&
							time_price.map((item, index) => {
								return (
									<span
										key={index}
										onClick={this.changeIndex.bind(
											this,
											index
										)}
										className={setCur(index)}
									>
										{item.name}
									</span>
								);
							})}
					</div>
				</div>
				<div className="detail">
					<div className="item">
						<div className="name">当前价格</div>
						<div
							className={setcolor(
								time_price_data ? time_price_data.price : ""
							)}
						>
							{time_price_data ? time_price_data.price : ""}
						</div>
					</div>
					<div className="item">
						<div className="name">Volume</div>
						<div
							className={setcolor(
								time_price_data ? time_price_data.volume : ""
							)}
						>
							{time_price_data ? time_price_data.volume : ""}
						</div>
					</div>
					<div className="item">
						<div className="name">24H-Change</div>
						<div
							className={setcolor(
								time_price_data
									? time_price_data["24h_change"]
									: ""
							)}
						>
							{time_price_data
								? time_price_data["24h_change"]
								: ""}
						</div>
					</div>
					<div className="item">
						<div className="name">24H最高值</div>
						<div
							className={setcolor(
								time_price_data
									? time_price_data["24h_max_price"]
									: ""
							)}
						>
							{time_price_data
								? time_price_data["24h_max_price"]
								: ""}
						</div>
					</div>
					<div className="item">
						<div className="name">24H最低值</div>
						<div
							className={setcolor(
								time_price_data
									? time_price_data["24h_min_price"]
									: ""
							)}
						>
							{time_price_data
								? time_price_data["24h_min_price"]
								: ""}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		time_price_index: state.pageData.time_price_index,
		time_price: state.pageData.totleData
			? state.pageData.totleData.project_time_prices
			: null,
		time_price_data: state.pageData.time_price_data
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		changeTimePriceIndexAction: actions.changeTimePriceIndexAction(
			dispatch
		),
		getTimePriceDataAction: actions.getTimePriceDataAction(dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(RealTime);
