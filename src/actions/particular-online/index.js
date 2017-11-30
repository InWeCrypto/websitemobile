import { getData } from "../../views/lib/js/app";
import { requestUrl } from "../../config/config";
export const TOTLEDATA = "TOTLEDATA";
export const TIMEPRICEDATA = "TIMEPRICEDATA";
export const MARKETDATA = "MARKETDATA";
export const MARKETTYPE = "MARKETTYPE";
export const DESCINDEX = "DESCINDEX";
export const INEWSINDEX = "INEWSINDEX";
export const VIDEOLIST = "VIDEOLIST";
export const IMGTXTLIST = "IMGTXTLIST";
export const DAYINDEX = "DAYINDEX";
export const KLINEDATA = "KLINEDATA";
export const NEWSFLASH = "NEWSFLASH";
export const totleData = data => {
	return {
		type: TOTLEDATA,
		data
	};
};
const getTotleDataAction = dispatch => data => {
	getData(`${requestUrl}/project/${data.id}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(totleData(res.data));
				dispatch(inewsIndex(0));
				dispatch(dayIndex(0));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const timePriceData = data => {
	return {
		type: TIMEPRICEDATA,
		data: {
			type: data.type,
			data: data.data
		}
	};
};
const getTimePriceDataAction = dispatch => data => {
	getData(`${requestUrl}/${data.url}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(
					timePriceData({
						type: data.type,
						data: res.data
					})
				);
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};

const marketData = data => {
	return {
		type: MARKETDATA,
		data
	};
};
const getMarketDataAction = dispatch => data => {
	getData(`${requestUrl}/${data.url}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(marketData(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const changeMarketType = data => {
	return {
		type: MARKETTYPE,
		data
	};
};
const changeMarketTypeAction = dispatch => data => {
	dispatch(changeMarketType(data));
};
const descIndex = data => {
	return {
		type: DESCINDEX,
		data
	};
};
const changeDescIndex = dispatch => data => {
	dispatch(descIndex(data));
};
const inewsIndex = data => {
	return {
		type: INEWSINDEX,
		data
	};
};
const changeInewsIndex = dispatch => data => {
	dispatch(inewsIndex(data));
};
const videoList = data => {
	return {
		type: VIDEOLIST,
		data
	};
};
const getVideoListAction = dispatch => data => {
	getData(`${requestUrl}/category/${data.id}/articles/video`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(videoList(res.data));
				if (!res.data || res.data.length == 0) {
					dispatch(inewsIndex(1));
				}
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const imgTxtList = data => {
	return {
		type: IMGTXTLIST,
		data
	};
};
const getImgTxtListAction = dispatch => data => {
	getData(`${requestUrl}/category/${data.id}/articles/img-txt`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(imgTxtList(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const dayIndex = data => {
	return {
		type: DAYINDEX,
		data
	};
};
const changeDayIndexAction = dispatch => data => {
	dispatch(dayIndex(data));
};
const kData = data => {
	return {
		type: KLINEDATA,
		data
	};
};

const getKlineDataAction = dispatch => data => {
	getData(`${requestUrl}/${data.url}/${data.timeType}/${data.len}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(kData(res.data));
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
		type: NEWSFLASH,
		data
	};
};
const getNewsListAction = dispatch => data => {
	getData(`${requestUrl}/category/${data.id}/articles/txt/all`).then(res => {
		if (res.code === 4000) {
			dispatch(newsList(res.data));
		} else {
			throw new Error(res.msg);
		}
	});
};

export default {
	getTotleDataAction,
	getTimePriceDataAction,
	getMarketDataAction,
	changeMarketTypeAction,
	changeDescIndex,
	getVideoListAction,
	getImgTxtListAction,
	changeInewsIndex,
	changeDayIndexAction,
	getKlineDataAction,
	getNewsListAction
};
