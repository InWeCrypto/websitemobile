import { combineReducers } from "redux";

const initState = {
	data: null
};

const allInfDetail = (state = initState, action) => {
	switch (action.type) {
		case "GET_ALL_INFO_DETAIL":
			return Object.assign({}, state, {
				data: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ allInfDetail });
