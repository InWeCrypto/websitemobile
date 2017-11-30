import { combineReducers } from "redux";
import {
	TOTLEDATA,
	//TIMEPRICEINDEX,
	TIMEPRICEDATA,
	MARKETDATA,
	MARKETTYPE,
	DESCINDEX,
	INEWSINDEX,
	VIDEOLIST,
	IMGTXTLIST,
	DAYINDEX,
	KLINEDATA,
	NEWSFLASH
} from "../../actions/particular-online/index";
const initialState = {
	id: null,
	totleData: null,
	//time_price_index: null,
	time_price_data: null,
	marketData: null,
	showMarketType: false,
	descIndex: 0,
	inewsIndex: null,
	videoList: null,
	imgTxtList: null,
	dayIndex: null,
	klineData: null,
	newsList: null
};
const pageData = (state = initialState, action) => {
	switch (action.type) {
		case TOTLEDATA:
			return Object.assign({}, state, {
				totleData: action.data
			});
		case TIMEPRICEDATA:
			return Object.assign({}, state, {
				time_price_data: {
					[action.data.type]: action.data.data,
					...state.time_price_data
				}
			});
		case MARKETDATA:
			return Object.assign({}, state, {
				marketData: action.data
			});
		case MARKETTYPE:
			return Object.assign({}, state, {
				showMarketType: action.data
			});
		case DESCINDEX:
			return Object.assign({}, state, {
				descIndex: action.data
			});
		case INEWSINDEX:
			return Object.assign({}, state, {
				inewsIndex: action.data
			});
		case VIDEOLIST:
			return Object.assign({}, state, {
				videoList: action.data
			});
		case IMGTXTLIST:
			return Object.assign({}, state, {
				imgTxtList: action.data
			});
		case DAYINDEX:
			return Object.assign({}, state, {
				dayIndex: action.data
			});
		case KLINEDATA:
			return Object.assign({}, state, {
				klineData: action.data
			});
		case NEWSFLASH:
			return Object.assign({}, state, {
				newsList: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ pageData });
