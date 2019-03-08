import { http } from "./request";
export const STATISTICS = {

    // POST /a/ws/apply/
    getList(params) {
        return http.post('aplStatistics/list', params)
    },

    // 统计图GET /a/ws/apply/aplStatistics/statistics
    getPicture(params) {
        return http.get('aplStatistics/statistics', 
            {params}
        )
    }
}