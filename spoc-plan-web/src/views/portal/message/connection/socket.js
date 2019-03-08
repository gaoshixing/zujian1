import Sockette from 'sockette';
export default function(url,opts) {
    
	let act = {
		send(data){
			ws.json(data);
		},
		onmessage(e){
			// console.log('Received:', e)
			try{
				opts.onmessage(JSON.parse(e.data));
			}catch(e){
				console.warn(e);
			}
		},
		onopen(e){
			// console.log('Connected!', e)
			opts.onopen(e);
		},
		close(){
			ws.close();
		}
	};
	const ws = new Sockette(url, {
		timeout: 5e3,
		maxAttempts: 10,
		onopen: act.onopen,
		onmessage: act.onmessage,
		onreconnect: e => console.log('Reconnecting...', e),
		onmaximum: e => console.log('Stop Attempting!', e),
		onclose: e => console.log('Closed!', e),
		onerror: e => console.log('Error:', e)
	});
	return act;

}

const r = 'portal.ivygate.cn';
let wsurl = 'ws://'+location.host.split(':')[0]+':2346';
if(location.host==r){
	wsurl = 'wss://'+r+'/socket';
}


export const config = {
	MSG_TYPE_TEXT:1,
	MSG_TYPE_NOTICE:2,
	MSG_TYPE_SHARE:3,
	MSG_TYPE_IMG:4,
	url:wsurl
    
};

export const util = {
	parse(str,username){
		if(str.indexOf('@')>=0){
			const r = new RegExp(`@${username}`,'g');
			return str.replace(r,function(m,i)
			{
				return `<i>${m}</i>`;
			});
		}
		const match = str.match(/<(icon-[\w\-]+)\/>/);
		if(match){
			return `<svg class="icon"><use xlink:href="#${match[1]}" href="#${match[1]}"/></svg>`;
		}
		return str; // todo xss filter
	},
	byteFormat(size){
		if(size){
			var name=['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
			var pos=0;
			while(size>=1204) {
				size/=1024;
				pos++;
			}
			if(size.toFixed){
				return size.toFixed(2)+' '+name[pos];
			}
		}
	},
	getCursortPosition (textDom){
		var cursorPos = 0;
		if (document.selection) {
			// IE Support
			textDom.focus ();
			var selectRange = document.selection.createRange();
			selectRange.moveStart ('character', -textDom.value.length);
			cursorPos = selectRange.text.length;
		}else if (textDom.selectionStart || textDom.selectionStart == '0') {
			// Firefox support
			cursorPos = textDom.selectionStart;
		}
		return cursorPos;
	},
	timeBefore(t){
		var sec=[31536000,2592000,604800,86400,3600,60,1];
		var ext=['年','个月','星期','天','小时','分钟','秒'];
		for(let i in sec)
		{
			const x=Math.floor(t/sec[i]);
			if(x!=0)
			{
				return `${x}${ext[i]}前`;
			}
		}
	}
};