import { GETBANNERDATA, GETNEWSDATA } from "../../actions/index/";
import { combineReducers } from "redux";

const initialState = {
	bannerList: [],
	newsList: []
};

const indexData = (state = initialState, action) => {
	switch (action.type) {
		case "GETBANNERDATA":
			return Object.assign({}, state, {
				bannerList: action.data
			});
		case "GETNEWSDATA":
			return Object.assign({}, state, {
				newsList: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ indexData });
