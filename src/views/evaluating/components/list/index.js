import "../../../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";

import actions from "../../../../actions/evaluating/index";
import CommonTitle from "../../../components/common-title/";

class List extends Component {
	constructor() {
		super();

		this.state = {
			title: "ICO评测"
		};
	}
	componentDidMount() {
		document.title = this.state.title;
	}
	render() {
		const state = this.state;
		let { data } = this.props;
		return (
			<div>
				<div className="list-box">
					{!data || data.length === 0
						? "暂无数据"
						: data.map(item => {
								return (
									<div className="group" key={item.id}>
										<div className="group-cont">
											<div className="img-box">
												<img src={item.img} />
											</div>
											<Link
												className="group-info"
												to={{
													pathname: "/detail",
													search: "?id=" + item.id
												}}
											>
												<div className="group-title">
													{item.title}
												</div>
												<div className="group-item">
													目前状态: {item.assess_status}
												</div>
												<div className="group-item">
													官网: {item.website}
												</div>
												<div className="group-item">
													时间: {item.updated_at}
												</div>
											</Link>
										</div>
									</div>
								);
							})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.ico.data
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getIcoAction: actions.getIcoAction(dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(List);
