import { getData } from "../../views/lib/js/app";
import { requestUrl } from "../../config/config";
const allInfoDetail = data => {
	return {
		type: "GET_ALL_INFO_DETAIL",
		data
	};
};

const getAllInfoDetailAction = (dispatch, id) => {
	getData(`${requestUrl}/article/${id}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(allInfoDetail(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			//s	console.log(e);
		});
};

export default {
	getAllInfoDetailAction
};
