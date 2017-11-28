import "../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
//import { createStore, applyMiddleware } from "redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import reducers from "../../reducers/all-info-detail-page/";
import actions from "../../actions/all-info-detail-page/";
import AppComponent from "./components/app";
let store;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	store = createStore(
		reducers,
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__()
				: () => {}
		)
	);
} else {
	store = createStore(reducers, applyMiddleware(thunk));
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<AppComponent />
		</Router>
	</Provider>,
	document.querySelector("#app")
);
