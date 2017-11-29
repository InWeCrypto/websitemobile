import "./index.less";
import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../../actions/particular-online/";

class Trade extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAll: false
		};
		this.changeShow = this.changeShow.bind(this);
	}
	componentDidMount() {
		this.props.getMarketDataAction({
			url: this.props.marketlist[0].url
		});
	}
	changeShow() {
		this.setState({
			showAll: true
		});
	}
	render() {
		const { marketlist, marketData } = this.props;
		return (
			<div className="trade">
				<div className="trade-title">交易市场</div>
				<div className="trade-data">
					{marketData &&
						marketData.length > 0 &&
						marketData.map((item, index) => {
							if (!this.state.showAll && index >= 3) {
								return null;
							}
							return (
								<div className="item" key={index}>
									<div className="item-line">
										<div className="td">
											{item.source}
											<span className="name">
												({item.pair})
											</span>
										</div>
										<div className="td1">{item.pairce}</div>
									</div>
									<div className="item-line">
										<div className="td">
											Volum: {item.volum_24}
										</div>
										<div className="td1">{item.update}</div>
									</div>
								</div>
							);
						})}
					{!this.state.showAll &&
						marketData &&
						marketData.length > 3 && (
							<div
								className="morebtn"
								onClick={this.changeShow}
							/>
						)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		marketlist: state.pageData.totleData
			? state.pageData.totleData.project_markets
			: null,
		marketData: state.pageData.marketData
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getMarketDataAction: actions.getMarketDataAction(dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
