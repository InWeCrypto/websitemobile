import "./index.less";
import React, { Component } from "react";

export default class Trade extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="trade">
				<div className="trade-title">
					交易市场<div className="type-box">
						<div className="checked">sss</div>
					</div>
				</div>
				<div className="trade-data">
					<div className="item">
						<div className="td">平台</div>
						<div className="td">交易对</div>
						<div className="td">价格</div>
						<div className="td">24H成交量</div>
						<div className="td">更新时间</div>
					</div>
					<div className="item">
						<div className="td">平台平台平台平台平台平台平台平台平台平台平台平台平台平台</div>
						<div className="td">交易对</div>
						<div className="td">价格</div>
						<div className="td">24H成交量</div>
						<div className="td">更新时间</div>
					</div>
				</div>
			</div>
		);
	}
}
