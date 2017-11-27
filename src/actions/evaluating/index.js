import { getData } from "../../views/lib/js/app";
import { requestUrl } from "../../config/config";

const ico = data => {
	return {
		type: "GET_ICO",
		data
	};
};
const getIcoAction = dispatch => data => {
	getData(`${requestUrl}/article/ico`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(ico(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			//s	console.log(e);
		});
};

const icoDetail = data => {
	return {
		type: "GET_ICO_DETAIL",
		data
	};
};

const getIcoDetailAction = (dispatch, id) => {
	getData(`${requestUrl}/article/ico/${id}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(icoDetail(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};

export default {
	getIcoAction,
	getIcoDetailAction
};
