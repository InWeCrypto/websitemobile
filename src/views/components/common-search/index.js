import "./index.less";
import React, { Component } from "react";

import { requestUrl } from "../../../config/config";
import { getData } from "../../lib/js/app";

export default class CommonSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: "",
			list: [],
			isFirst: true
		};
		this.searchClick = this.searchClick.bind(this);
		this.keyWordChange = this.keyWordChange.bind(this);
	}
	searchClick(e) {
		e.stopPropagation();
		e.preventDefault();
		getData(`${requestUrl}/search/articles?k=${this.state.keyword}`).then(
			res => {
				console.log(res);
				this.setState({
					isFirst: false
				});
			}
		);
	}
	keyWordChange(e) {
		this.setState({
			keyword: e.target.value
		});
	}
	render() {
		let { list, isFirst } = this.state;
		return (
			<div className="common-search">
				<div className="search-box">
					<form className="search-txt" onSubmit={this.searchClick}>
						<input
							type="search"
							value={this.state.keyword}
							onChange={this.keyWordChange}
						/>
					</form>
					<button
						className="searchbtn"
						onClick={this.props.cannelBtn}
					>
						取消
					</button>
				</div>
				<div className="search-list">
					{isFirst && (
						<div
							style={{
								color: "#a4a4a4",
								padding: "30px 0",
								textAlign: "center"
							}}
						>
							请输入搜索内容
						</div>
					)}
					{list &&
						list.map((item, index) => {
							return (
								<a href="" key={index} className="search-item">
									111
								</a>
							);
						})}
					{!isFirst &&
						list.length == 0 && (
							<div
								style={{
									color: "#a4a4a4",
									padding: "30px 0",
									textAlign: "center"
								}}
							>
								暂无数据，请重新搜索
							</div>
						)}
				</div>
			</div>
		);
	}
}
