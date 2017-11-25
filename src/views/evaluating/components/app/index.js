import "../../../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";

import { connect } from "react-redux";

import actions from "../../../../actions/evaluating/index";
import CommonTitle from "../../../components/common-title/";

import List from "../list/";
import Detail from "../detail/";

class AppComponent extends Component {
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
			<Router>
				<div>
					<CommonTitle title={state.title} />
					<Switch>
						<Route exact path="/" component={List} />
						<Route path="/detail" component={Detail} />
					</Switch>
				</div>
			</Router>
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
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
