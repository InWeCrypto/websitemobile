import { getData } from "../../views/lib/js/app";
import { requestUrl } from "../../config/config";
const TOTLEDATA = "TOTLEDATA";
const TIMEPRICEINDEX = "TIMEPRICEINDEX";
const TIMEPRICEDATA = "TIMEPRICEDATA";
const MARKETINDEX = "MARKETINDEX";
const MARKETDATA = "MARKETDATA";
const MARKETTYPE = "MARKETTYPE";
const DESCINDEX = "DESCINDEX";
const INEWSINDEX = "INEWSINDEX";
const VIDEOLIST = "VIDEOLIST";
const IMGTXTLIST = "IMGTXTLIST";
const DAYINDEX = "DAYINDEX";
const KLINEDATA = "KLINEDATA";
const totleData = data => {
	return {
		type: TOTLEDATA,
		data
	};
};
const getTotleDataAction = dispatch => data => {
	getData(`${requestUrl}/project/` + data.id)
		.then(res => {
			if (res.code === 4000) {
				dispatch(totleData(res.data));
				dispatch(timePrice(0));
				dispatch(marketIndex(0));
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
const timePrice = data => {
	return {
		type: TIMEPRICEINDEX,
		data
	};
};
const changeTimePriceIndexAction = dispatch => idx => {
	dispatch(timePrice(idx));
};
const timePriceData = data => {
	return {
		type: TIMEPRICEDATA,
		data
	};
};
const getTimePriceDataAction = dispatch => data => {
	getData(`${requestUrl}/${data.url}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(timePriceData(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const marketIndex = data => {
	return {
		type: MARKETINDEX,
		data
	};
};
const changeMarketIndexAction = dispatch => data => {
	dispatch(marketIndex(data));
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
export default {
	getTotleDataAction,
	changeTimePriceIndexAction,
	getTimePriceDataAction,
	changeMarketIndexAction,
	getMarketDataAction,
	changeMarketTypeAction,
	changeDescIndex,
	getVideoListAction,
	getImgTxtListAction,
	changeInewsIndex,
	changeDayIndexAction,
	getKlineDataAction
};
