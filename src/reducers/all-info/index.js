import { combineReducers } from "redux";
import { GET_ALL_INFO } from "../../actions/all-info/";

const initState = {
	data: null
};

const allInfo = (state = initState, action) => {
	switch (action.type) {
		case "GET_ALL_INFO":
			return Object.assign({}, state, {
				data: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ allInfo });
