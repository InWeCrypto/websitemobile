export const GETBANNERDATA = "GETBANNERDATA";
export const GETNEWSDATA = "GETNEWSDATA";
export const GETPROJECTDATA = "GETPROJECTDATA";
export const TIMEPRICE = "TIMEPRICE";
export const TIMEPRICEDATA = "TIMEPRICEDATA";
export const TIMEPRICEINDEX = "TIMEPRICEINDEX";
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
const projectList = data => {
	return {
		type: GETPROJECTDATA,
		data
	};
};
const getProjectListAction = dispatch => () => {
	getData(`${requestUrl}/home/project/is_mobile`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(projectList(res.data));
				let list = res.data;
				let arr = [];
				if (list && list.length > 0) {
					list.map(item => {
						if (item.type == 5) {
							if (item.url && item.url.length > 0) {
								arr.push({
									id: item.id,
									curUrl: item.url
								});
							}
						}
					});
					dispatch(timePrice(arr));
				}
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const timePrice = data => {
	return {
		type: "TIMEPRICE",
		data
	};
};
const timePriceIndex = data => {
	return {
		type: "TIMEPRICEINDEX",
		data
	};
};
const changeTimePriceIndexAction = dispatch => data => {
	dispatch(timePriceIndex(data));
};

const timePriceData = data => {
	return {
		type: TIMEPRICEDATA,
		data: {
			id: data.id,
			data: data.data
		}
	};
};
const getTimePriceDataAction = dispatch => data => {
	getData(`${requestUrl}/${data.url}`)
		.then(res => {
			console.log(res);
			if (res.code === 4000) {
				dispatch(timePriceData({ id: data.id, data: res.data }));
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
	getNewsListAction,
	getProjectListAction,
	changeTimePriceIndexAction,
	getTimePriceDataAction
};
