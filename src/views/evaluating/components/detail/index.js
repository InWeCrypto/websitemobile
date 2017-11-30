import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import echarts from "echarts";
import actions from "../../../../actions/evaluating/";
// import $ from 'jquery'

class Detail extends Component {
	componentDidUpdate() {
		let strcture = this.refs.strcture;
		let myChart = echarts.init(strcture);
		let strctureData = this.props.data.ico_assess_structure;
		let value = [];
		let theColor = [];
		strctureData.map(item => {
			value.push({ value: item.percentage });
			theColor.push(item.color_value);
		});
		let option = {
			series: [
				{
					type: "pie",
					radius: "85%",
					center: ["50%", "50%"],
					data: value,
					color: theColor,
					labelLine: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "rgba(0, 0, 0, 0.5)"
						}
					}
				}
			]
		};
		myChart.setOption(option);
	}
	render() {
		let { data } = this.props;
		let unit = "";
		if (data) {
			unit = data.ico.unit;
		}
		return (
			<div>
				{!data || data.length === 0 ? (
					<div style={{ textAlign: "center", padding: ".3rem" }}>
						暂无数据
					</div>
				) : (
					<div className="detail">
						<div className="box1">
							<div className="detail-title">
								<h2>{data.title}</h2>
								<p>更新：{data.updated_at}</p>
							</div>
							<ul className="detail-risk">
								<li className="risk-left">
									<span className="left-score">
										{data.ico_score}
									</span>
									<span>{data.assess_status}</span>
								</li>

								<li className="risk-middle">
									风险等级：<span
										className="risk-level"
										style={{
											background: data.risk_level_color
										}}
									/>{" "}
									{data.risk_level_name}
								</li>
								<li className="risk-right">
									{data.tags &&
										data.tags.length > 0 &&
										data.tags.map(item => {
											return (
												<span
													className="risk-label"
													key={item.id}
												>
													{item.tag_info.name}
												</span>
											);
										})}
								</li>
							</ul>
							<p className="declaration">
								郑重声明：所有 ICO
								都有归０的风险，所有信息仅供参考
							</p>
						</div>

						<div className="detail-ico-publish">
							<h4 className="title-p">
								<div className="title-p-txt">ICO详情</div>
								{data.website && (
									<a
										className="a"
										target="_blacnk"
										href={data.website}
									>
										官网>
									</a>
								)}
							</h4>
							<table className="publish-content">
								{data.ico_assess_issue_info &&
									data.ico_assess_issue_info.length > 0 &&
									data.ico_assess_issue_info.map(item => {
										return (
											<tbody key={item.id}>
												<tr>
													<td>众筹时间</td>
													<td
													>{`${item.crowdfunding_start_at.substring(
														0,
														10
													)}至${item.crowdfunding_end_at.substring(
														5,
														10
													)}`}</td>
												</tr>

												<tr>
													<td>总发行量</td>
													<td
													>{`${item.ico_circulation /
														100000000}亿${
														unit
													}`}</td>
												</tr>
												<tr>
													<td>ICO量</td>

													<td>{`${item.ico_amount /
														100000000}亿${
														unit
													}`}</td>
												</tr>

												<tr>
													<td>接受币种</td>
													<td>{item.ico_accept}</td>
												</tr>
												<tr>
													<td>众筹金额</td>
													<td
													>{`${item.ico_crowfunding_amount /
														10000}万${
														item.ico_crowfunding_amount_unit
													}等值`}</td>
												</tr>
												<tr>
													<td>价格</td>
													<td>{item.ico_price}</td>
												</tr>
											</tbody>
										);
									})}
							</table>
						</div>
						<div className="detail-strcture">
							<h4>结构</h4>
							<div className="box2">
								<div
									className="strcture-chart"
									ref="strcture"
								/>
								<div className="strcture-detail">
									{data.ico_assess_structure &&
										data.ico_assess_structure.length > 0 &&
										data.ico_assess_structure.map(item => {
											return (
												<p
													className="strcture-box"
													key={item.id}
												>
													<div className="strcture-name">
														{item.color_name}:
													</div>
													<div className="strcture-info">
														{item.percentage}%{
															item.desc
														}
													</div>
												</p>
											);
										})}
								</div>
							</div>
						</div>
						<div className="detail-project">
							<h4>项目概述</h4>
							<div className="project-main">
								<img src={data.img} />
								<div className="project-text">{data.desc}</div>
							</div>
						</div>
						<div className="detail-analy">
							<h4 className="project-analy-title">
								项目分数分析
							</h4>
							<table>
								<thead>
									<tr>
										<th>类型</th>
										<th>评测观点</th>
										<th style={{ borderRight: 0 }}>
											评分(10分评测)
										</th>
									</tr>
								</thead>
								<tbody>
									{data.ico_assess_project_analyse &&
										data.ico_assess_project_analyse.length >
											0 &&
										data.ico_assess_project_analyse.map(
											item => {
												return (
													<tr key={item.id}>
														<td>{item.name}</td>
														<td>{item.desc}</td>
														<td
															style={{
																borderRight: 0
															}}
														>
															{item.score}
														</td>
													</tr>
												);
											}
										)}
								</tbody>
							</table>
							<p className="analy-remind">
								注：分数由项目白皮书以及整体规划评估而得出，只做投资参考。
							</p>
							<a
								className="white-paper"
								href={data.white_paper_url}
							>
								白皮书>
							</a>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.icoDetail.data
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	let arr = window.location.hash.split("");
	let locationId = arr[arr.length - 1];
	return {
		getIcoDetailAction: actions.getIcoDetailAction(dispatch, locationId)
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
