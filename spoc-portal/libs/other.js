import axios from 'axios';


export const other = {
	panListDir(params){
		return axios.get('/index.php/apps/files/ajax/list.php',{params});
	},
	chatSearch(data){
		return axios.post('/chat/search',data);
	},
	readStat(uid,gid){
		return axios.post('/chat/readStat',{uid,gid});
	}
	
};
