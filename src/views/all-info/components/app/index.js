import "../../../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";

import actions from "../../../../actions/all-info/index";
import CommonTitle from "../../../components/common-title/";

import uncollect from "../../../lib/img/icon_noFavorites.png";
import collected from "../../../lib/img/icon_Favorites.png";

class AppComponent extends Component {
	constructor() {
		super();
		this.state = {
			title: "所有资讯"
		};
	}
	async componentWillMount() {
		let d = await this.props.getAllInfoAction();
	}

	componentDidMount() {
		document.title = this.state.title;
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.data && nextProps.data != this.props.data) {
			this.props.showDataAction({
				type: 0,
				data: nextProps.data
			});
		}
	}
	changeType(idx) {
		this.props.changeTypeIndexAction({
			index: idx
		});
		this.props.showDataAction({
			type: idx,
			data: this.props.data
		});
	}

	setCur(idx) {
		return idx == this.props.typeIndex ? "nav-btn cur" : "nav-btn";
	}
	render() {
		const state = this.state;
		let { showData } = this.props;
		return (
			<Router>
				<div>
					<CommonTitle title={state.title} />
					<div className="nav-box">
						<span
							className={this.setCur(0)}
							onClick={this.changeType.bind(this, 0)}
						>
							所有
						</span>
						<span
							className={this.setCur(3)}
							onClick={this.changeType.bind(this, 3)}
						>
							视频
						</span>
						<span
							className={this.setCur(2)}
							onClick={this.changeType.bind(this, 2)}
						>
							图文
						</span>
						<span
							className={this.setCur(1)}
							onClick={this.changeType.bind(this, 1)}
						>
							快讯
						</span>
					</div>
					<div className="list-box">
						{!showData || showData.length === 0 ? (
							<div
								style={{
									textAlign: "center",
									padding: ".5rem"
								}}
							>
								暂无数据
							</div>
						) : (
							showData.map(item => {
								return (
									<div className="group" key={item.id}>
										<div className="group-title">
											{item.title}
										</div>
										<div className="group-cont">
											<div className="img-box">
												<img src={item.img} />
											</div>
											<a
												className="group-info"
												href={item.url}
											>
												<div>{item.desc}</div>
											</a>
										</div>
										<div className="group-ctrl">
											<span className="txt">
												{item.updated_at}
												&nbsp;|&nbsp;
											</span>
											<span className="txt">
												阅读：{item.click_rate}&nbsp;|&nbsp;
											</span>
											<span className="txt">
												回复：{item.is_comment}&nbsp;|&nbsp;
											</span>
											<span className="txt">
												收藏&nbsp;&nbsp;
												<img
													className="collect"
													src={
														item.save_user &&
														item.save_user !== 0
															? collected
															: uncollect
													}
												/>
											</span>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.allInfo.data,
		typeIndex: state.allInfo.typeIndex,
		showData: state.allInfo.showData
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getAllInfoAction: actions.getAllInfoAction(dispatch),
		changeTypeIndexAction: actions.changeTypeIndexAction(dispatch),
		showDataAction: actions.showDataAction(dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
