export const extendKey = (keys,origin,target) => {
    keys.forEach((i)=>{
        target[i]=origin[i];
    });
    return target;
}

export const getItemIndex = (arr,item) => {
    for(let i in arr){
        if(arr[i].id==item.id){
            return i;
        }
    }
    return -1;
}
export const getKValue = (...args) => {
    let obj = args.shift();
    for(let i in args){
        let k = args[i];
        obj = obj[k]
        if(typeof obj === 'undefined') {
            return obj;
        }
    }
    return obj;
}
export const arrInclude = (big,small) => {
    for(let i in small){
        let item = small[i];
        if (big.indexOf(item)<0){
            return false;
        }
    }
    return true;
}