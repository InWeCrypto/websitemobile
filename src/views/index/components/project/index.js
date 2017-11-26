import "./index.less";
import React, { Component } from "react";

class ChainList {
	constructor() {
		this._this = {};
		this.length = 0;
	}
	add(item) {
		this._this[item.cur] = {};
		this._this[item.cur]["data"] = item.data;
		this._this[item.cur]["type"] = item.type;
		this._this[item.cur]["id"] = item.cur;
		if (item.prev) {
			this._this[item.cur]["prev"] = item.prev;
			this._this[item.prev]["next"] = item.cur;
		}
		this.length++;
	}
	findByType(id, type) {
		if (this._this[id].type != type) {
			return this.findByType(this._this[id].next, type);
		} else {
			return this._this[id];
		}
	}
	remove(id) {
		let item = this._this[id];
		let prev = this._this[this._this[id].prev];
		let next = this._this[this._this[id].next];
		if (prev) {
			prev.next = this._this[id].next;
		}
		if (next) {
			next.prev = this._this[id].prev;
		}

		delete this._this[id];
		this.length--;
	}
	getList() {
		return this._this;
	}
	getLength() {
		return this.length;
	}
}

export default class project extends Component {
	constructor(props) {
		super(props);
	}
	setData(data) {
		if (!data || !(data instanceof Array)) {
			return [];
		}
		var list = new ChainList();
		let newArr = [];
		let curIndex = 0;
		data.map((item, index) => {
			list.add({
				data: item,
				prev: index - 1 < 0 ? null : data[index - 1].id,
				cur: item.id,
				type: item.grid_type
			});
		});
		let list1 = list.getList();
		let keys = Object.keys(list1);
		var newList = [];

		data.map((item, index) => {
			if (!list1[item.id]) {
				return;
			}
			if (item.grid_type == 1) {
				newList.push(item);
				let id = item.id;
				if (list1[id].next) {
					let i2 = list.findByType(list1[id].next, 1);
					if (i2) {
						newList.push(i2.data);
						list.remove(i2.id);
					}
				}
				list.remove(item.id);
			} else {
				newList.push(item);
				list.remove(item.id);
			}
		});
		newList.map(item => {
			console.log(item.grid_type);
		});
	}
	render() {
		const { projectList } = this.props;
		const listData = this.setData(projectList);
		return (
			<div className="project">
				<div className="project-title">
					<span className="line" />
					<span className="txt">项目</span>
					<span className="line" />
				</div>
				<div className="project-box">
					<div className="item">
						<a href="./particular-online/#/?id=1">1</a>
					</div>
					<div className="item">1</div>
					<div className="item item1">1</div>
					<div className="item item2">1</div>
				</div>
			</div>
		);
	}
}
