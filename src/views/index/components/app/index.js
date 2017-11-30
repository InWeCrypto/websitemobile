import React, { Component } from "react";
import { connect } from "react-redux";
import CommonTitle from "../../../components/common-title/";
import Banner from "../banner/";
import News from "../news";
import Project from "../project/";
import actions from "../../../../actions/index/";

class AppComponent extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		Pace.start();
	}
	componentDidMount(nextProps) {
		document.title = "首页";
		this.props.getBannerListAction();
		this.props.getNewsListAction();
		this.props.getProjectListAction();
		this.pollData();
	}
	async pollData() {
		const { timepriceList, timepriceIndex } = this.props;
		if (timepriceList && timepriceList.length > 0) {
			await this.props.getTimePriceDataAction({
				id: timepriceList[timepriceIndex].id,
				url: timepriceList[timepriceIndex].curUrl
			});
			let len = timepriceList.length;
			let idx = timepriceIndex + 1;
			if (idx >= len) {
				idx = 0;
				this.props.changeTimePriceIndexAction(idx);
				setTimeout(() => {
					this.pollData();
				}, 5000);
			} else {
				this.props.changeTimePriceIndexAction(idx);
				setTimeout(() => {
					this.pollData();
				}, 1000);
			}
		} else {
			setTimeout(() => {
				this.pollData();
			}, 1000);
		}
	}
	render() {
		const { bannerList, newsList, projectList, timepriceData } = this.props;
		return (
			<div className="app">
				<CommonTitle isStation={false} />
				<Banner bannerList={bannerList} />
				<News newsList={newsList} />
				<Project
					timepriceData={timepriceData}
					projectList={projectList}
				/>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		bannerList: state.indexData.bannerList,
		newsList: state.indexData.newsList,
		projectList: state.indexData.projectList,
		timepriceList: state.indexData.timepriceList,
		timepriceData: state.indexData.timepriceData,
		timepriceIndex: state.indexData.timepriceIndex
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getBannerListAction: actions.getBannerListAction(dispatch),
		getNewsListAction: actions.getNewsListAction(dispatch),
		getProjectListAction: actions.getProjectListAction(dispatch),
		getTimePriceDataAction: actions.getTimePriceDataAction(dispatch),
		changeTimePriceIndexAction: actions.changeTimePriceIndexAction(dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
