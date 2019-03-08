import axios from 'axios';


const baseURL = '/';

export const http = axios.create({
	baseURL,
	timeout: 20000,
	// withCredentials: true,
});

function NewQuery(init)
{
	return new Proxy({},{
		get(obj,key){
			return new Proxy({},{
				get(o,k){
					return init(key,k);
				}
			});
		}
	});
}



var q1 = NewQuery(function(key,k)
{
	return function(...param){
		return http[key](k,...param);
	};
});


export default q1;