import {
	GETBANNERDATA,
	GETNEWSDATA,
	GETPROJECTDATA
} from "../../actions/index/";
import { combineReducers } from "redux";

const initialState = {
	bannerList: [],
	newsList: [],
	projectList: null
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
		case "GETPROJECTDATA":
			return Object.assign({}, state, {
				projectList: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ indexData });
