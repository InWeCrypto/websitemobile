import "../lib/css/app.less";
import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import reducers from "../../reducers/index/";
import actions from "../../actions/index/";
import AppComponent from "./components/app/";

const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<AppComponent />
		</Router>
	</Provider>,
	document.querySelector("#app")
);
