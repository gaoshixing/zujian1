
import { http } from "./request";

export const RILI = {
    // 日历
    originDate(params){
        return http.get('/plServiceCal/calendarList',{params})
    }
}