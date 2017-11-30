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
		Pace.start();
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
							showData.map((item, index) => {
								return (
									<a
										href={item.url}
										className="group"
										key={index}
									>
										<div className="img-box">
											<img
												src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2337889669,494384891&fm=173&s=6DC1A60C4E782D9265B412930300C08C&w=218&h=146&img.JPG"
												alt=""
											/>
										</div>
										<div className="title">
											{item.title}
										</div>
										<div className="intro">{item.desc}</div>
										<div className="time">
											{item.created_at}
										</div>
									</a>
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
