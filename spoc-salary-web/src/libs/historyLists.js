export const historyLists = (params, oldParams, keyVal) => {
    // params为修改的参数
    // oldParams为获取的源数据
    // keyVal为key，value的对应
    // console.log(params)
    // console.log(oldParams)
    // console.log(keyVal)

    let arr = '';
    for (let key in params) {
        if(!params.hasOwnProperty(key)) { continue; }
        let val = params[key];
        // let keyType = 
        if(val) {
            if(typeof(keyVal[key]) == 'string') {
                arr += `<p>修改${keyVal[key]}，由${oldParams[key]} 改为 ${params[key]}</p>`
            }
        }
    }

    return arr;
}