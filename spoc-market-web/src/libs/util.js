export const isParent = (node, parent) => {
    while (node) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

// 返回被移除的元素 ，未找到返回[]
export const arrayRemove = (arr, id) => {
    let index;
    for (let i = 0, len = arr.length; i < len; i++) {
        const item = arr[i];
        if (item.id === id) {
            return arr.splice(i, 1);
        }
    }
    return [];
}

export const replace = (str, ...args) => {
    let s = str;
    args.forEach(arr => {
        s = s.replace(arr[0], arr[1]);
    })
    return s;
}

export const digitUppercase = n => {
    n = Math.abs(n);
    var s = '';
    var digit = ['零', '壹', '贰', '叁', '肆','伍', '陆', '柒', '捌', '玖'];
    var unit = [ 
        ['', '万', '亿','兆'],
        ['', '拾', '佰', '仟']
    ];
    for (let i = 0; i < unit[0].length; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/,'零') + unit[0][i] + s;
    }
    return s.replace(/(零.)+/g, '零').replace(/(^零|零$)/g, '');
}

export const extendKey = (keys,origin,target) => {
    keys.forEach((i)=>{
        target[i]=origin[i];
    });
    return target;
}

export const toWan = (v)=>{
    const val = (v/10000).toFixed(1);
    if(isNaN(val)){
        return '';
    }
    const vint = parseInt(val);
    if(vint==val){
        return vint;
    }
    return val;
}

export const waitUntil = (c,fun,fall,dur=50,maxTimes=200)=>{
    let times = 0;
    const funwarp=()=>{
        const ret = c();
        times++;
        if(ret){
            console.log(fun)
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

export const dateUtil = {
    xMonth(num){
        const a = new Date((+new Date()) + num * 2592000000 )
        return a;
    },
}

export const validIdCard=str=>
{
    if(typeof str !=='string'){
        return false;
    }
    const reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([\d|X])$/;
    const province=[11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91];
    const power=[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const refNumber =["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    if(!reg.test(str)){
        return false;
    }
    if(province.findIndex(n=>n==str.substr(0,2))<0){
        return false;
    }
    const y = str.substr(6,4);
    const m = str.substr(10,2);
    const d = str.substr(12,2);
    const bir = new Date(`${y}/${m}/${d}`);
    if(bir.getFullYear()!=y){
        return false;
    }
    let birm = bir.getMonth()+1;
    birm = birm<9?`0${birm}`:birm;
    let bird = bir.getDate();
    bird = bird<9?`0${bird}`:bird;
    if(!(m==birm && d==bird)){
        return false;
    }
    if(+bir > +new Date() || +bir < (+new Date('1900/01/01'))){
        return false;
    }
    let sum=0;
    str.substr(0,17).split('').forEach((item,i)=>{
        sum += parseInt(item)*power[i];
    });
    let last = refNumber[sum%11];
    if(str.charAt(17)==last){
        return true;
    }
    return false;
}


function deepCopy(oldObj) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
        newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
        for (var i in oldObj) {
            newObj[i] = deepCopy(oldObj[i]);
        }
    }
    return newObj;
}
export const clone = (obj)=>{
    return deepCopy(obj);
}