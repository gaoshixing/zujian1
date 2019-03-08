import { httpSchool as http} from "./request";

const post = (src, data) => {
	return http.post(`/xxChoiceSchool/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/xxChoiceSchool/${src}`, data);
};

export const plSchool = {
	choiceAndSignNumber(params) {
		return get('choiceAndSignNumber', {params});
	},
}