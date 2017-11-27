import "../../../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import echarts from "echarts";
import actions from "../../../../actions/particular-online/";
import CommonTitle from "../../../components/common-title/";
import RealTime from "../realtime/";
import Trade from "../trade/";
import Inews from "../../../components/inews/";
import { requestUrl } from "../../../../config/config";
//import { disconnect } from "cluster";

class AppComponent extends Component {
	constructor(props) {
		super(props);
	}
	async componentWillMount() {
		let query = window.util.getQuery(window.location.href);
		document.title = "项目详情";
		await this.props.getTotleDataAction({ id: query.id });
	}

	getTime(type) {
		if (type == null) {
			return;
		}
		let timeType;
		switch (type) {
			case 0:
				timeType = "1m";
				break;
			case 1:
				timeType = "5m";
				break;
			case 2:
				timeType = "15m";
				break;
			case 3:
				timeType = "30m";
				break;
			case 4:
				timeType = "1h";
				break;
			case 5:
				timeType = "2h";
				break;
			case 6:
				timeType = "4h";
				break;
			case 7:
				timeType = "6h";
				break;
			case 8:
				timeType = "1d";
				break;
			case 9:
				timeType = "1w";
				break;
		}
		return timeType;
	}
	setDescCur(idx) {
		return idx === this.props.descIndex
			? "intro-navbtn cur"
			: "intro-navbtn";
	}
	changeDescClick(idx) {
		this.props.changeDescIndex(idx);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.inewsIndex != this.props.inewsIndex) {
			if (nextProps.inewsIndex == 0) {
				this.props.getVideoListAction({ id: this.props.totleData.id });
			}
			if (nextProps.inewsIndex == 0) {
				this.props.getImgTxtListAction({ id: this.props.totleData.id });
			}
		}
		if (
			!this.props.totleData ||
			!this.props.totleData.desc ||
			nextProps.totleData.desc != this.props.totleData.desc
		) {
			$(this.refs.twitterbox).html(nextProps.totleData.desc);
		}
		if (
			nextProps.time_price_index != this.props.time_price_index ||
			nextProps.dayIndex != this.props.dayIndex
		) {
			let time = this.getTime(nextProps.dayIndex);
			if (!time) {
				return;
			}
			let data = {
				url:
					nextProps.totleData.project_time_prices[
						nextProps.time_price_index
					].k_line_data_url,
				timeType: time,
				len: 10
			};
			this.props.getKlineDataAction(data);
		}
		if (nextProps.klineData != this.props.klineData) {
			console.log(11);
			this.viewEcharts(nextProps.klineData);
		}
	}
	setOptionData(data) {
		if (!(data instanceof Array)) {
			return;
		}
		let res = [];
		data.map(item => {
			let r = [];
			r.push(this.setTimeString(item["time"]));
			r.push(item["opened_price"]);
			r.push(item["closed_price"]);
			r.push(item["min_price"]);
			r.push(item["max_price"]);
			r.push(item["volume"]);
			res.push(r);
		});
		return res;
	}
	setTimeString(time) {
		let t = new Date(time);
		let year = t.getFullYear();
		let month = t.getMonth() + 1;
		let day = t.getDate();
		let hours = t.getHours();
		let min = t.getMinutes();
		return `${year}/${month}/${day} ${hours}:${min}`;
	}
	viewEcharts(data) {
		let chart = this.refs.chart;
		let myChart = echarts.init(chart);
		var upColor = "rgba(236, 0, 0, 0.5)";
		var upBorderColor = "#8A0000";
		var downColor = "rgba(0,218,60,0.5)";
		var downBorderColor = "#008F28";

		// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
		var data = splitData(
			data ? JSON.parse(JSON.stringify(this.setOptionData(data))) : []
		);

		// document.write(JSON.stringify(data));
		function splitData(rawData) {
			var categoryData = [];
			var values = [];
			var volumes = [];
			for (var i = 0; i < rawData.length; i++) {
				categoryData.push(rawData[i].splice(0, 1)[0]);
				values.push(rawData[i]);
				volumes.push([
					i,
					rawData[i][4],
					rawData[i][0] > rawData[i][1] ? 1 : -1
				]);
			}

			return {
				categoryData: categoryData,
				values: values,
				volumes: volumes
			};
		}

		function calculateMA(dayCount, data) {
			var result = [];
			for (var i = 0, len = data.values.length; i < len; i++) {
				if (i < dayCount) {
					result.push("-");
					continue;
				}
				var sum = 0;
				for (var j = 0; j < dayCount; j++) {
					sum += data.values[i - j][1];
				}
				result.push(+(sum / dayCount).toFixed(3));
			}
			return result;
		}

		var option = {
			backgroundColor: "#fff",
			animation: false,
			legend: {
				bottom: 10,
				left: "center",
				data: ["Dow-Jones index"]
			},
			barWidth: 4,
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "cross"
				},
				backgroundColor: "rgba(245, 245, 245, 0.8)",
				borderWidth: 1,
				borderColor: "#ccc",
				padding: 10,
				textStyle: {
					color: "#000"
				},
				position: function(pos, params, el, elRect, size) {
					var obj = { top: 10 };
					obj[
						["left", "right"][+(pos[0] < size.viewSize[0] / 2)]
					] = 30;
					return obj;
				},
				extraCssText: "width: 170px"
			},
			axisPointer: {
				link: { xAxisIndex: "all" },
				label: {
					backgroundColor: "#777"
				}
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: false
					},
					brush: {
						type: ["lineX", "clear"]
					}
				}
			},
			brush: {
				xAxisIndex: "all",
				brushLink: "all",
				outOfBrush: {
					colorAlpha: 0.1
				}
			},
			visualMap: {
				show: false,
				seriesIndex: 5,
				dimension: 2,
				pieces: [
					{
						value: 1,
						color: downColor
					},
					{
						value: -1,
						color: upColor
					}
				]
			},
			grid: [
				{
					left: "15%",
					right: "8%",
					height: "45%"
				},
				{
					left: "15%",
					right: "8%",
					top: "70%",
					height: "13%"
				}
			],
			xAxis: [
				{
					type: "category",
					data: data.categoryData,
					scale: true,
					boundaryGap: false,
					axisLine: { onZero: false },
					splitLine: { show: false },
					splitNumber: 20,
					min: "dataMin",
					max: "dataMax",
					axisPointer: {
						z: 100
					}
				},
				{
					type: "category",
					gridIndex: 1,
					data: data.categoryData,
					scale: true,
					boundaryGap: false,
					axisLine: { onZero: false },
					axisTick: { show: false },
					splitLine: { show: false },
					axisLabel: { show: false },
					splitNumber: 20,
					min: "dataMin",
					max: "dataMax",
					axisPointer: {
						label: {
							formatter: function(params) {
								var seriesValue = (params.seriesData[0] || {})
									.value;
								return (
									params.value +
									(seriesValue != null
										? "\n" +
											echarts.format.addCommas(seriesValue)
										: "")
								);
							}
						}
					}
				}
			],
			yAxis: [
				{
					scale: true,
					splitArea: {
						show: true
					}
				},
				{
					scale: true,
					gridIndex: 1,
					splitNumber: 2,
					axisLabel: { show: false },
					axisLine: { show: false },
					axisTick: { show: false },
					splitLine: { show: false }
				}
			],
			dataZoom: [
				{
					type: "inside",
					xAxisIndex: [0, 1],
					start: 90,
					end: 100
				},
				{
					show: true,
					xAxisIndex: [0, 1],
					type: "slider",
					top: "85%",
					start: 90,
					end: 100
				}
			],
			series: [
				{
					name: "Dow-Jones index",
					type: "candlestick",
					data: data.values,
					itemStyle: {
						normal: {
							color: upColor,
							color0: downColor,
							borderColor: null,
							borderColor0: null
						}
					},
					tooltip: {
						formatter: function(param) {
							param = param[0];
							return [
								"Date: " +
									param.name +
									'<hr size=1 style="margin: 3px 0">',
								"Open: " + param.data[0] + "<br/>",
								"Close: " + param.data[1] + "<br/>",
								"Lowest: " + param.data[2] + "<br/>",
								"Highest: " + param.data[3] + "<br/>"
							].join("");
						}
					}
				},
				{
					name: "MA5",
					type: "line",
					data: calculateMA(5, data),
					smooth: true,
					lineStyle: {
						normal: { opacity: 0.5 }
					}
				},
				{
					name: "MA10",
					type: "line",
					data: calculateMA(10, data),
					smooth: true,
					lineStyle: {
						normal: { opacity: 0.5 }
					}
				},
				{
					name: "MA20",
					type: "line",
					data: calculateMA(20, data),
					smooth: true,
					lineStyle: {
						normal: { opacity: 0.5 }
					}
				},
				{
					name: "MA30",
					type: "line",
					data: calculateMA(30, data),
					smooth: true,
					lineStyle: {
						normal: { opacity: 0.5 }
					}
				},
				{
					name: "Volume",
					type: "bar",
					xAxisIndex: 1,
					yAxisIndex: 1,
					data: data.volumes
				}
			]
		};

		myChart.setOption(option);
	}
	changeInewsType(idx) {
		this.props.changeInewsIndex(idx);
	}
	setKColor(idx) {
		return idx === this.props.dayIndex ? "kbox-btn cur" : "kbox-btn";
	}
	changeTime(idx) {
		this.props.changeDayIndexAction(idx);
	}
	render() {
		const { totleData, videoList, inewsIndex, imgTxtList } = this.props;
		return (
			<div className="particular-online">
				<CommonTitle title="项目详情" />
				<div className="title">{totleData ? totleData.name : ""}</div>
				<div className="container">
					<div className="realtime">
						<RealTime
							data={
								totleData ? totleData.project_time_prices : null
							}
						/>
					</div>
					<div className="k-box">
						<div className="kbox-menu">
							<span
								className={this.setKColor(0)}
								onClick={this.changeTime.bind(this, 0)}
							>
								1m
							</span>
							<span
								className={this.setKColor(1)}
								onClick={this.changeTime.bind(this, 1)}
							>
								5m
							</span>
							<span
								className={this.setKColor(2)}
								onClick={this.changeTime.bind(this, 2)}
							>
								15m
							</span>
							<span
								className={this.setKColor(3)}
								onClick={this.changeTime.bind(this, 3)}
							>
								30m
							</span>
							<span
								className={this.setKColor(4)}
								onClick={this.changeTime.bind(this, 4)}
							>
								1h
							</span>
							<span
								className={this.setKColor(5)}
								onClick={this.changeTime.bind(this, 5)}
							>
								2h
							</span>
							<span
								className={this.setKColor(6)}
								onClick={this.changeTime.bind(this, 6)}
							>
								4h
							</span>
							<span
								className={this.setKColor(7)}
								onClick={this.changeTime.bind(this, 7)}
							>
								6h
							</span>
							<span
								className={this.setKColor(8)}
								onClick={this.changeTime.bind(this, 8)}
							>
								1d
							</span>
							<span
								className={this.setKColor(9)}
								onClick={this.changeTime.bind(this, 9)}
							>
								1w
							</span>
						</div>
						<div className="chart" ref="chart" />
					</div>
					<div className="trade-box">
						<Trade />
					</div>
					<div className="intro-box">
						<div className="intro-nav">
							{totleData &&
								totleData.project_desc &&
								totleData.project_desc.length > 0 &&
								totleData.project_desc.map((item, index) => {
									return (
										<div
											key={index}
											className={this.setDescCur(index)}
											onClick={this.changeDescClick.bind(
												this,
												index
											)}
										>
											{item.title}
										</div>
									);
								})}
						</div>
						<iframe
							src={
								totleData
									? requestUrl +
										"/article/" +
										totleData.project_desc[
											this.props.descIndex
										].id
									: ""
							}
							className="intro-cont"
						/>
					</div>
					{((videoList && videoList.length > 0) ||
						(imgTxtList && imgTxtList.length > 0)) && (
						<div className="news-box">
							<Inews
								videoList={videoList}
								inewsIndex={inewsIndex}
								imgTxtList={imgTxtList}
								handClick={this.changeInewsType.bind(this)}
							/>
						</div>
					)}

					<div className="box1">
						{totleData &&
							totleData.project_explorers &&
							totleData.project_explorers.length > 0 && (
								<div className="box-item left">
									<div className="box-title">Explorer</div>
									<div className="box-cont">
										{totleData.project_explorers.map(
											(item, index) => {
												return (
													<a
														className="a"
														href={item.url}
														key={index}
														target="_blank"
													>
														{item.name}
													</a>
												);
											}
										)}
									</div>
								</div>
							)}
						{totleData &&
							totleData.project_wallets &&
							totleData.project_wallets.length > 0 && (
								<div className="box-item right">
									<div className="box-title">Wallet</div>
									<div className="box-cont">
										{totleData.project_wallets.map(
											(item, index) => {
												return (
													<a
														key={index}
														className="wallet-item"
														href={item.url}
													>
														{item.name}
													</a>
												);
											}
										)}
									</div>
								</div>
							)}
					</div>
					<div className="twitter">
						<div className="twitter-title">Twitter</div>
						<div className="twitter-cont" ref="twitterbox" />
					</div>
					{totleData &&
						totleData.project_medias &&
						totleData.project_medias.length0 && (
							<div className="box2">
								<div className="box-title">更多资讯</div>
								<div className="box-cont">
									{totleData.project_medias.map(
										(item, index) => {
											return (
												<a
													key={index}
													className="moreinfo"
													href={item.url}
													target="_blank"
												>
													<img src={item.img} />
												</a>
											);
										}
									)}
								</div>
							</div>
						)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		totleData: state.pageData.totleData,
		descIndex: state.pageData.descIndex,
		inewsIndex: state.pageData.inewsIndex,
		videoList: state.pageData.videoList,
		imgTxtList: state.pageData.imgTxtList,
		dayIndex: state.pageData.dayIndex,
		klineData: state.pageData.klineData,
		time_price_index: state.pageData.time_price_index
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	console.log(actions);
	return {
		getTotleDataAction: actions.getTotleDataAction(dispatch),
		changeDescIndex: actions.changeDescIndex(dispatch),
		getVideoListAction: actions.getVideoListAction(dispatch),
		getImgTxtListAction: actions.getImgTxtListAction(dispatch),
		changeInewsIndex: actions.changeInewsIndex(dispatch),
		changeDayIndexAction: actions.changeDayIndexAction(dispatch),
		getKlineDataAction: actions.getKlineDataAction(dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
