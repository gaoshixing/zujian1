export const statusTransForLeader = (val) => {
    let statusTransObj = {
        'unreceive': '未分配',
        'assigned': '已分配',
        'received':'已接案',
        'initiation meeting':'已进行的初始会议',
        'plan report': '已出具规划报告',
        'planning':'规划中',
        'transfered':'已交接'
    }
    return statusTransObj[val] || val;
}
export const statusTransForTeacher = (val) => {
    let statusTransObj = {
        'assigned': '未接案',
        'received':'已接案',
        'initiation meeting':'已进行的初始会议',
        'plan report': '已出具规划报告',
        'planning':'规划中',
        'transfered':'已交接'
    }
    return statusTransObj[val] || val;
}