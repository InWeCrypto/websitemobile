import { combineReducers } from "redux";

const initState = {
	data: null
};

const ico = (state = initState, action) => {
	switch (action.type) {
		case "GET_ICO":
			return Object.assign({}, state, {
				data: action.data
			});
		default:
			return state;
	}
};

const icoDetail = (state = initState, action) => {
	switch (action.type) {
		case "GET_ICO_DETAIL":
			return Object.assign({}, state, {
				data: action.data
			});
		default:
			return state;
	}
};

export default combineReducers({ ico, icoDetail });
