import "./index.less";
import React, { Component } from "react";
import Slider from "react-slick";

export default class News extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="news-box">
				<div className="title">News</div>
				<div className="news" />
				<div className="more" />
			</div>
		);
	}
}
