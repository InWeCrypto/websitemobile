import "../../../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import actions from "../../../../actions/particular-online/";
import CommonTitle from "../../../components/common-title/";
import RealTime from "../realtime/";
import Trade from "../trade/";
import Inews from "../../../components/inews/";
import { requestUrl } from "../../../../config/config";

class AppComponent extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		let query = window.util.getQuery(window.location.href);
		document.title = "项目详情";
		this.props.getTotleDataAction({ id: query.id });
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
	}
	changeInewsType(idx) {
		this.props.changeInewsIndex(idx);
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
					<div className="k-box" />
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
						<div className="box-item left">
							<div className="box-title">Explorer</div>
							<div className="box-cont">
								{totleData &&
									totleData.project_explorers &&
									totleData.project_explorers.length > 0 &&
									totleData.project_explorers.map(
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
						<div className="box-item right">
							<div className="box-title">Wallet</div>
							<div className="box-cont">
								{totleData &&
									totleData.project_wallets &&
									totleData.project_wallets.length > 0 &&
									totleData.project_wallets.map(
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
		imgTxtList: state.pageData.imgTxtList
		// newsList: state.indexData.newsList
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	console.log(actions);
	return {
		getTotleDataAction: actions.getTotleDataAction(dispatch),
		changeDescIndex: actions.changeDescIndex(dispatch),
		getVideoListAction: actions.getVideoListAction(dispatch),
		getImgTxtListAction: actions.getImgTxtListAction(dispatch),
		changeInewsIndex: actions.changeInewsIndex(dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
