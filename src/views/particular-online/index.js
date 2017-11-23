import "../lib/css/app.less";
import "./index.less";
import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import reducers from "../../reducers/particular-online/";
import actions from "../../actions/particular-online/";
import AppComponent from "./components/app/";
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// import CommonTitle from "../components/common-title/";
// import RealTime from "./components/realtime/";
// import Trade from "./components/trade/";
// import Inews from "../components/inews/";
// export default class AppComponent extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			title: "测试"
// 		};
// 	}
// 	componentDidMount() {
// 		document.title = this.state.title;
// 	}
// 	render() {
// 		return (
// 			<Router>
// 				<div className="particular-online">
// 					<CommonTitle />
// 					<div className="title">22</div>
// 					<div className="container">
// 						<div className="realtime">
// 							<RealTime />
// 						</div>
// 						<div className="k-box" />
// 						<div className="trade-box">
// 							<Trade />
// 						</div>
// 						<div className="intro-box">
// 							<div className="intro-nav">
// 								<div className="intro-navbtn cur">2</div>
// 								<div className="intro-navbtn">2</div>
// 								<div className="intro-navbtn">2</div>
// 								<div className="intro-navbtn">2</div>
// 							</div>
// 							<iframe className="intro-cont" />
// 						</div>
// 						<div className="news-box">
// 							<Inews />
// 						</div>
// 						<div className="box1">
// 							<div className="box-item left">
// 								<div className="box-title">Explorer</div>
// 								<div className="box-cont">
// 									<a className="a" href="" target="_blank">
// 										baidu.com
// 									</a>
// 								</div>
// 							</div>
// 							<div className="box-item right">
// 								<div className="box-title">Wallet</div>
// 								<div className="box-cont">
// 									<a className="wallet-item" href="">
// 										IMEW
// 									</a>
// 								</div>
// 							</div>
// 						</div>
// 						<div className="twitter">
// 							<div className="twitter-title">Twitter</div>
// 							<div className="twitter-cont" />
// 						</div>
// 						<div className="box2">
// 							<div className="box-title">更多资讯</div>
// 							<div className="box-cont">
// 								<a className="moreinfo" href="">
// 									s
// 								</a>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</Router>
// 		);
// 	}
// }
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<AppComponent />
		</Router>
	</Provider>,
	document.querySelector("#app")
);
