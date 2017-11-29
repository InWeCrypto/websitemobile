import { combineReducers } from "redux";
import { GET_ALL_INFO, TYPEINDEX } from "../../actions/all-info/";

const initState = {
	data: null,
	typeIndex: 0
};

const allInfo = (state = initState, action) => {
	switch (action.type) {
		case "GET_ALL_INFO":
			return Object.assign({}, state, {
				data: action.data
			});
		case "TYPEINDEX":
			return Object.assign({}, state, {
				typeIndex: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ allInfo });
