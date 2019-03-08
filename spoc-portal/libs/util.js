export const util = {
	byteFormat(size) {
		if (size) {
			const name = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			let pos = 0;
			while (size >= 1204) {
				size /= 1024;
				pos++;
			}
			if (size.toFixed) {
				return size.toFixed(2) + ' ' + name[pos];
			}
		}
	},
	timeBefore(t) {
		const sec = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
		let ext = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
		for (let i in sec) {
			const x = Math.floor(t / sec[i]);
			if (x != 0) {
				return `${x}${ext[i]}前`;
			}
		}
	},
	timeFormat(t) {
		const times = [3600, 60, 1];
		const arr = [];
		for (let i in times) {
			const v = times[i];
			const x = Math.floor(t / v);
			if (x > 0) {
				t -= x * v;
			}
			arr.push(x);
		}
		return arr
			.map(i => {
				const v = i.toString();
				return v.length < 2 ? `0${v}` : v;
			})
			.join(':');
	},
	durationFormat(t){
		const m = Math.floor(t/60);
		let s = t - 60*m;
		if(s<=9){
			s=`0${s}`;
		}
		return `${m}分${s}秒`;
	},
	uuid(){
		return Math.floor((1+Math.random())*0x1000000000).toString(16);
	}
};
export const isFun = f => {
	return typeof f === 'function';
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


export const throttle = (fn, wait) => {
	let isThrottled = false,
		lastArgs = null;
	return function wrapper() {
		if (isThrottled) {
			lastArgs = arguments;
		} else {
			fn.apply(this, arguments);
			isThrottled = setTimeout(() => {
				isThrottled = false;
				if (lastArgs) {
					wrapper.apply(this, lastArgs);
					lastArgs = null;
				}
			}, wait);
		}
	};
};

export const debounce = (func, delay) => {
	let inDebounce;
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
};

export const waitUntil = (c,fun,fall,dur=50,maxTimes=100)=>{
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
            fall&&fall(times);fall&&fall(times);
        }
    }
    funwarp();
}

/*
* 获取时间区间
* @params type 传入类型 date month year
* @param num 时间区间的天数/月数/年数
* @param noHMS Boolean 是否添加时分秒结尾
*/
export function getTimeInterval(type, num, noHMS) {
	if (num === null) return {};
	let startTime, endTime = '';
	switch (type) {
		case 'date':
			startTime = noHMS ? new Date(new Date().setDate(new Date().getDate() + num)).format('yyyy-MM-dd') : new Date(new Date().setDate(new Date().getDate() + num)).format('yyyy-MM-dd') + ' 00:00:00';
			endTime = noHMS ? new Date(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd') : new Date(new Date().setDate(new Date().getDate() + 1)).format('yyyy-MM-dd') + ' 00:00:00';
		break;
		case 'month':
			startTime = noHMS ? new Date(new Date().setMonth(new Date().getMonth() + num + 1, 1)).format('yyyy-MM') : new Date(new Date().setMonth(new Date().getMonth() + num + 1, 1)).format('yyyy-MM') + '-01 00:00:00';
			endTime = noHMS ? new Date(new Date().setMonth(new Date().getMonth() + 1, 1)).format('yyyy-MM') : new Date(new Date().setMonth(new Date().getMonth() + 1, 1)).format('yyyy-MM') + '-01 00:00:00';
		break;
		case 'year':
			startTime = noHMS ? new Date(new Date().setFullYear(new Date().getFullYear() + num)).format('yyyy') : new Date(new Date().setFullYear(new Date().getFullYear() + num)).format('yyyy') + '-01-01 00:00:00';
			endTime = noHMS ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)).format('yyyy') : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).format('yyyy') + '-01-01 00:00:00';
		break;
	}
	return {
		startTime,
		endTime,
	};
};