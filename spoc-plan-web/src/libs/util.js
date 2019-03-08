
export const waitUntil = (c,fun,fall,dur=50,maxTimes=20)=>{
    let times = 0;
    const funwarp=()=>{
        const ret = c();
        times++;
        if(ret){
            fun(times);
        } else if(times<maxTimes){
            setTimeout(()=>{
                funwarp();
            },dur)
        } else {
            fall&&fall(times);
        }
    }
    funwarp();
}

export const extname = (name) => {
    const ext = name.split('.').pop();
    return ext===name ? '':ext;
}

export const isFun = f=>{
    return typeof f === 'function'
}

/*
* 等待毫秒数
*/
export const wait = function (ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
};

/**
 * 金额格式化，当存在小数时，将显示两位小数
 */
export function currency(v) {
    if (!v) {
        return '0';
    }

    const result = String((v / 1).toFixed(2));
    // const pos = result.indexOf('.00');
    // if (pos !== -1) {
    //     return result.substr(0, pos);
    // } else {
        return result;
    // }
}
/*
* dateFormate
*/
export function dateFormate(val) {
    return new Date(val).format('yyyy-MM-dd hh:mm:ss');
};
/*
* 显示金额的简写
*/
export function currencyLogogram(v) {
        return String(v).split('-')[0];
};