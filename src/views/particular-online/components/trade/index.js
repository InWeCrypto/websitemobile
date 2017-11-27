import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../../actions/particular-online/";

class Trade extends Component {
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.marketindex != this.props.marketindex) {
			if (
				this.props.marketlist[nextProps.marketindex] &&
				this.props.marketlist[nextProps.marketindex]
			) {
				this.props.getMarketDataAction({
					url: this.props.marketlist[nextProps.marketindex].url
				});
			}
		}
	}
	changeIndex(idx) {
		this.props.changeMarketIndexAction(idx);
		this.props.changeMarketTypeAction(false);
	}
	toggleMarket() {
		this.props.changeMarketTypeAction(!this.props.showMarketType);
	}
	render() {
		const {
			marketlist,
			marketindex,
			marketData,
			showMarketType
		} = this.props;
		return (
			<div className="trade">
				<div className="trade-title">
					交易市场<div className="type-box">
						<div className="checked">
							<span onClick={this.toggleMarket.bind(this)}>
								{marketlist && marketlist[marketindex]
									? marketlist[marketindex].en_name
									: ""}
							</span>
							<div className="checkbox">
								{showMarketType &&
									marketlist &&
									marketlist.length > 0 &&
									marketlist.map((item, index) => {
										return (
											<div
												onClick={this.changeIndex.bind(
													this,
													index
												)}
												key={index}
												className="check-item"
											>
												{item.en_name}
											</div>
										);
									})}
							</div>
						</div>
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
					{marketData &&
						marketData.length > 0 &&
						marketData.map((item, index) => {
							return (
								<div className="item" key={index}>
									<div className="td">{item.source}</div>
									<div className="td">{item.pair}</div>
									<div className="td">{item.pairce}</div>
									<div className="td">{item.volum_24}</div>
									<div className="td">{item.update}</div>
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
		marketindex: state.pageData.marketindex,
		marketlist: state.pageData.totleData
			? state.pageData.totleData.project_markets
			: null,
		marketData: state.pageData.marketData,
		showMarketType: state.pageData.showMarketType
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getMarketDataAction: actions.getMarketDataAction(dispatch),
		changeMarketIndexAction: actions.changeMarketIndexAction(dispatch),
		changeMarketTypeAction: actions.changeMarketTypeAction(dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
