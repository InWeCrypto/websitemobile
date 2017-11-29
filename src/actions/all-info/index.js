import { getData } from "../../views/lib/js/app";
import { requestUrl } from "../../config/config";
export const GET_ALL_INFO = "GET_ALL_INFO";
export const TYPEINDEX = "TYPEINDEX";
export const SHOWDATA = "SHOWDATA";
const allInfo = data => {
	return {
		type: GET_ALL_INFO,
		data
	};
};

const getAllInfoAction = dispatch => data => {
	getData(`${requestUrl}/article/all`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(allInfo(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			//console.log(e);
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

const showData = data => {
	return {
		type: SHOWDATA,
		data
	};
};
const showDataAction = dispatch => data => {
	let oldData = data.data;
	var res = [];
	switch (data.type) {
		case 0:
			res = oldData;
			break;
		case 1:
			res = oldData.filter(item => {
				if (item.type === 1) {
					return item;
				}
			});
			break;
		case 2:
			res = oldData.filter(item => {
				if (item.type === 2) {
					return item;
				}
			});
			break;
		case 3:
			res = oldData.filter(item => {
				if (item.type === 3) {
					return item;
				}
			});
			break;
	}
	dispatch(showData(res));
};

export default {
	getAllInfoAction,
	changeTypeIndexAction,
	showDataAction
};
