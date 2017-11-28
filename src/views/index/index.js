import "../lib/css/app.less";
import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import reducers from "../../reducers/index/";
import actions from "../../actions/index/";
import AppComponent from "./components/app/";

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
