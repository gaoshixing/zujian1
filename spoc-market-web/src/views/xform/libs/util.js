
export const isParent = (node, parent) => {
	while (node) {
		if (node === parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
};

export const clone = (src) =>{
	var ret=(src instanceof Array ? [] : {});
	for(var key in src) {
		if(!src.hasOwnProperty(key)) { continue; }
		var val=src[key];
		if(val && typeof(val)=='object') { val=clone(val);  }
		ret[key]=val;
	}
	return ret;
};

export const  deepEqual = (x, y) =>{
	const ok = Object.keys, tx = typeof x, ty = typeof y;
	return x && y && tx === 'object' && tx === ty ? (
	  ok(x).length === ok(y).length &&
		ok(x).every(key => deepEqual(x[key], y[key]))
	) : (String(x) === String(y));
};

export const isContains = (arr,target)=>{
	return arr.some(item=>{
		return deepEqual(item,target);
	});
};

export const uuid = () => {
	return Math.floor((1+Math.random())*0x1000000000).toString(16);
};

export const isFunction = (value) => {
	return typeof value === 'function';
};

export const isObject = (value) => {
	return value && typeof value === 'object' && value.constructor === Object;
};

export const isString = (value) => {
	return typeof value === 'string' || value instanceof String;
};

export const isArray = (value) => {
	return value && typeof value === 'object' && value.constructor === Array;
};

export const isRegex = (value) => {
	return value && typeof value === 'object' && value.constructor === RegExp;
};

export const isEmpty = (value) => {
	return (isString(value) && value === '') || (isArray(value) && value.length === 0) || (isObject(value) && Object.keys(value).length === 0);
};

export const isEmail = (str) => {
	return /^[0-9a-zA-Z]+@(([0-9a-zA-Z]+)[.])+[a-z]{2,4}$/i.test(str);
};

export const isPhone = (str) => {
	return /^1[34578][0-9]{9}$/.test(str);
};