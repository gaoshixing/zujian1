import { httpCommon as http } from "./request";
export const choiceschool = {
	loadJobTree() {
		return http.get('/dict/buildTree');
	},
	getUserList(params) {
		return http.get('/user/listData', {
			params
		});
	},
	listJobTree() {
		return http.get('/dict/listJobTree');
	},
	listUnAssignUserMap(params) {
		return http.get('/user/listUnAssignUserMap', {
			params
		});
	},
	listData(params) {
		return http.get('/user/listData', {
			params
		});
	},
	listAssigndUserMap(params) {
		return http.get('/user/listAssigndUserMap', {
			params
		});
	},
	buildSearchTree() {
		return http.get('/office/buildSearchTree');
	},
	findByIds(params) {
		return http.get('/user/findByIds', {params});
	},
	listAllUserMap(params) {
		return http.get('/user/listAllUserMap', {params});
	}
}