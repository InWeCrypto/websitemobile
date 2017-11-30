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
	componentWillMount() {
		Pace.start();
	}
	componentDidMount() {
		document.title = this.state.title;
		this.props.getIcoAction();
	}
	componentDidUpdate() {
		Pace.start();
	}
	render() {
		const state = this.state;
		let { data } = this.props;
		return (
			<div>
				<div className="list-box">
					{!data || data.length === 0 ? (
						<div style={{ textAlign: "center", padding: ".3rem" }}>
							暂无数据
						</div>
					) : (
						data.map((item, index) => {
							return (
								<Link
									to={{
										pathname: "/detail",
										search: `?id=${item.id}`
									}}
									key={index}
									className="group"
								>
									<div className="img-box">
										<img
											src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2337889669,494384891&fm=173&s=6DC1A60C4E782D9265B412930300C08C&w=218&h=146&img.JPG"
											alt=""
										/>
									</div>
									<div className="title">
										<div className="title-txt">
											{item.title}
										</div>
										<span className="state">
											{item.assess_status}
										</span>
									</div>
									<div className="intro">{item.desc}</div>
									<div className="time">
										{item.created_at}
									</div>
								</Link>
							);
						})
					)}
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
