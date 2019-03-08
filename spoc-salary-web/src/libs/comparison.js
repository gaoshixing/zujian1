export const comparison = (original, modify, flag) => {
    // original为原始对象 object
    // modify修改之后的对象 object
    // console.log(original);
    var newObj = {};
    for(var key in original) {
		if(!original.hasOwnProperty(key)) { continue; }
        var val = original[key];
        if(val != null && typeof(val) == 'object') {
            newObj[key] = comparison(original[key], modify[key], 'child');
        }
        else if(original[key] !== modify[key]) {
            if(original[key] || modify[key]) newObj[key] = modify[key];
        }
    }
    // console.log(newObj)
    if(!flag || (flag && JSON.stringify(newObj) != '{}')) return newObj;
    return;
}