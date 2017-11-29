import { getData } from "../../views/lib/js/app";
import { requestUrl } from "../../config/config";
const GET_ALL_INFO = "GET_ALL_INFO";
const TYPEINDEX = "TYPEINDEX";
const allInfo = data => {
	return {
		type: GET_ALL_INFO,
		data
	};
};

const getAllInfoAction = dispatch => {
	getData(`${requestUrl}/article/all`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(allInfo(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			//s	console.log(e);
		});
};
const typeIndex = data => {
	return {
		type: TYPEINDEX,
		data
	};
};
const changeTypeIndexAction = dispatch => data => {
	dispatch(typeIndex(data.index));
};

export default {
	getAllInfoAction,
	changeTypeIndexAction
};
