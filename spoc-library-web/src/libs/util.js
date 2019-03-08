export function formatParams(paramsObj){
	let obj = Object.assign({},paramsObj);
	for(let key in obj){
		let val = obj[key];
		if(typeof val== 'string' && /^\[/.test(val)){
			obj[key] = val.replace('[','').replace(']','');
		}
		if(Array.isArray(val)){
			obj[key] = val.join(','); 
		}
	}
	return obj;
}
export function parseResData(obj){
	for(let key in obj){
		if(typeof obj[key]== 'string'&&/,/.test(obj[key])){
			obj[key] = obj[key].split(',');
		}
	}
	return obj;
}

export const urlPath = (path)=>{
	let origin = location.origin?location.origin:location.protocol+"//"+location.host;
	return `${origin}${path}`;
}

export const isParent = (node, parent) => {
	while (node) {
		if (node === parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}