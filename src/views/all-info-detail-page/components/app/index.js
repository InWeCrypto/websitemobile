import "../../../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import actions from "../../../../actions/all-info-detail-page/index";

import CommonTitle from "../../../components/common-title/";

import uncollect from "../../../lib/img/uncollect.png";
import collected from "../../../lib/img/collected.png";

let locationId = window.location.search.split("?")[1];
console.log(locationId);
class AppComponent extends Component {
	constructor() {
		super();
		this.state = {
			title: "资讯详情"
		};
	}
	componentDidMount() {
		document.title = this.state.title;
	}
	// componentDidUpdate() {
	// 	//console.log(this.props);
	// }
	render() {
		let state = this.state;
		let { data } = this.props;
		console.log(data);
		return (
			<Router>
				<div>
					<CommonTitle showReturn={true} title={state.title} />
					{!data ? (
						"暂无数据"
					) : (
						<div className="detail-container">
							<div className="detail-title">{data.title}</div>
							<div className="detail-info">
								<span className="txt">{data.updated_at}</span>
								<span className="txt">
									阅读：{data.click_rate}
								</span>
								<span className="txt">
									回复：{data.comments_count}
								</span>
								<span className="txt">
									收藏&nbsp;&nbsp;
									<img
										className="collect"
										src={
											data.save_user &&
											data.save_user !== 0
												? collected
												: uncollect
										}
									/>
								</span>
							</div>
							<div className="detail-cont">{data.desc}</div>
						</div>
					)}
				</div>
			</Router>
		);
	}
}
const mapStateToProps = state => {
	return {
		data: state.allInfDetail.data
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getAllInfoDetailAction: actions.getAllInfoDetailAction(
			dispatch,
			locationId
		)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
