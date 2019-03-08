import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salPerpetualCalenderRest/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salPerpetualCalenderRest/${src}`, data);
};

export const salPerpetualCalenderRest = {
	getCurrentYearAndMonth(params) {
		return get('getCurrentYearAndMonth', {params});
	},
	getCalendarByYearAndMonth(params) {
		return get('getCalendarByYearAndMonth', {params});
	},
	updateCalendar(params) {
		return post('updateCalendar', params);
	},
}