import { combineReducers } from "redux";
import { GET_ALL_INFO, TYPEINDEX, SHOWDATA } from "../../actions/all-info/";

const initState = {
	data: null,
	typeIndex: 0,
	showData: null
};

const allInfo = (state = initState, action) => {
	switch (action.type) {
		case GET_ALL_INFO:
			return Object.assign({}, state, {
				data: action.data
			});
		case TYPEINDEX:
			return Object.assign({}, state, {
				typeIndex: action.data
			});
		case SHOWDATA:
			return Object.assign({}, state, {
				showData: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ allInfo });
