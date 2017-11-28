import {
	GETBANNERDATA,
	GETNEWSDATA,
	GETPROJECTDATA,
	TIMEPRICE,
	TIMEPRICEDATA,
	TIMEPRICEINDEX
} from "../../actions/index/";
import { combineReducers } from "redux";

const initialState = {
	bannerList: [],
	newsList: [],
	projectList: null,
	timepriceList: null,
	timepriceData: {},
	timepriceIndex: 0
};

const indexData = (state = initialState, action) => {
	switch (action.type) {
		case GETBANNERDATA:
			return Object.assign({}, state, {
				bannerList: action.data
			});
		case GETNEWSDATA:
			return Object.assign({}, state, {
				newsList: action.data
			});
		case GETPROJECTDATA:
			return Object.assign({}, state, {
				projectList: action.data
			});
		case TIMEPRICE:
			return Object.assign({}, state, {
				timepriceList: action.data
			});
		case TIMEPRICEDATA:
			return Object.assign({}, state, {
				timepriceData: {
					[action.data.id]: action.data.data,
					...state.timepriceData
				}
			});
		case TIMEPRICEINDEX:
			return Object.assign({}, state, {
				timepriceIndex: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ indexData });
