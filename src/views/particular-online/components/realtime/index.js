import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../../actions/particular-online/";

class RealTime extends Component {
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.time_price != this.props.time_price) {
			nextProps.time_price.map((item, idx) => {
				this.props.getTimePriceDataAction({
					url: item.current_url,
					type: item.name
				});
			});
		}
	}
	setFixed(num) {
		let r = (num - 1 + 1).toFixed(4);
		return r;
	}
	render() {
		const { time_price, time_price_data } = this.props;
		const name = [];
		if (time_price) {
			time_price.map(item => {
				name.push(item.name);
			});
		}

		return (
			<div className="realtime-box">
				<div className="realtime-box1">
					{name &&
						time_price_data &&
						name.length > 0 &&
						name.map((item, index) => {
							return (
								<span key={index}>
									{time_price_data[item] &&
										this.setFixed(
											time_price_data[item].price
										)}
									{time_price_data[name[index + 1]] &&
										index < name.length - 1 && (
											<span>/</span>
										)}
								</span>
							);
						})}
				</div>
				<div className="change">
					{name &&
						time_price_data &&
						name.length > 0 &&
						name.map((item, index) => {
							return (
								<span key={index}>
									{time_price_data[item] &&
										time_price_data[item]["24h_change"]}
									{time_price_data[name[index + 1]] &&
										index < name.length - 1 && (
											<span>/</span>
										)}
								</span>
							);
						})}
				</div>
				<div className="realtime-item">
					<div className="text">Volume</div>
					<div className="text">
						{name &&
							time_price_data &&
							name.length > 0 &&
							name.map((item, index) => {
								return (
									<span key={index}>
										{time_price_data[item] &&
											this.setFixed(
												time_price_data[item].volume
											)}
										{time_price_data[name[index + 1]] &&
											index < name.length - 1 && (
												<span>/</span>
											)}
									</span>
								);
							})}
					</div>
				</div>
				<div className="realtime-item">
					<div className="text">24H最高值</div>
					<div className="text">
						{name &&
							time_price_data &&
							name.length > 0 &&
							name.map((item, index) => {
								return (
									<span key={index}>
										{time_price_data[item] &&
											this.setFixed(
												time_price_data[item][
													"24h_max_price"
												]
											)}
										{time_price_data[name[index + 1]] &&
											index < name.length - 1 && (
												<span>/</span>
											)}
									</span>
								);
							})}
					</div>
				</div>
				<div className="realtime-item">
					<div className="text">24H最低值</div>
					<div className="text">
						{name &&
							time_price_data &&
							name.length > 0 &&
							name.map((item, index) => {
								return (
									<span key={index}>
										{time_price_data[item] &&
											this.setFixed(
												time_price_data[item][
													"24h_min_price"
												]
											)}
										{time_price_data[name[index + 1]] &&
											index < name.length - 1 && (
												<span>/</span>
											)}
									</span>
								);
							})}
					</div>
				</div>
				<div className="realtime-footer">
					<span className="look">查看K线图</span>
				</div>
				<div className="realtime-top">
					<span className="btn">浏览器></span>
					<span className="btn">支持钱包></span>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		// time_price_index: state.pageData.time_price_index,
		time_price: state.pageData.totleData
			? state.pageData.totleData.project_time_prices
			: null,
		time_price_data: state.pageData.time_price_data
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		// changeTimePriceIndexAction: actions.changeTimePriceIndexAction(
		// 	dispatch
		// ),
		getTimePriceDataAction: actions.getTimePriceDataAction(dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(RealTime);
