export const GETBANNERDATA = "GETBANNERDATA";
export const GETNEWSDATA = "GETNEWSDATA";
import { getData } from "../../views/lib/js/app";
import { requestUrl } from "../../config/config";

const bannerList = data => {
	return {
		type: GETBANNERDATA,
		data
	};
};
const getBannerListAction = dispatch => () => {
	getData(`${requestUrl}/home/ad`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(bannerList(res.data.list));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const newsList = data => {
	return {
		type: GETNEWSDATA,
		data
	};
};
const getNewsListAction = dispatch => () => {
	getData(`${requestUrl}/home/news`)
		.then(res => {
			console.log(res);
			if (res.code === 4000) {
				dispatch(newsList(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
export default {
	getBannerListAction,
	getNewsListAction
};
