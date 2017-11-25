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
	componentDidMount(nextProps) {
		document.title = "首页";
		this.props.getBannerListAction();
		this.props.getNewsListAction();
		this.props.getProjectListAction();
	}
	render() {
		const { bannerList, newsList, projectList } = this.props;
		return (
			<div className="app">
				<CommonTitle title="首页" />
				<Banner bannerList={bannerList} />
				<News newsList={newsList} />
				<Project projectList={projectList} />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		bannerList: state.indexData.bannerList,
		newsList: state.indexData.newsList,
		projectList: state.indexData.projectList
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getBannerListAction: actions.getBannerListAction(dispatch),
		getNewsListAction: actions.getNewsListAction(dispatch),
		getProjectListAction: actions.getProjectListAction(dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
