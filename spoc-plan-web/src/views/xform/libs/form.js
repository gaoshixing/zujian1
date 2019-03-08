import { TYPES } from '../components/config';

const FormFields=
[
	TYPES.INPUT,
	TYPES.TEXTAREA,
	TYPES.CHECKBOX,
	TYPES.RADIO,
	TYPES.SELECT,
	TYPES.IMG,
	TYPES.FILE,
	TYPES.PERSON,
	TYPES.OFFICE,
	TYPES.DATE,
	TYPES.DATETIME,

];

const s ='yyyy-MM-dd';

export const formData = (form)=>{
	const data = {};
	form.forEach(item => {
		if(FormFields.indexOf(item.model)>-1) {
			if(Object.keys(data).indexOf(item.name)>-1){
				throw new Error(`duplicate key dected : ${item.name} `);
			} else {
				if(item.value instanceof Date){
					data[item.name]=item.value.format(item.dateformat||s);
				} else {
					data[item.name]=item.value;
				}
			}
		}
	});
	return data;
};

export const validLayout = (form)=>{
	const { layout , settings } = form;
	let keys = [];
	layout.forEach(item=>{
		if(FormFields.includes(item.model)){
			if(item.name===''){
				throw new Error(`empty key dected in ${item.title}`);
			}
			if(keys.includes(item.name)){
				throw new Error(`duplicate key dected : ${item.name} in ${item.title} `);
			}
			keys.push(item.name);
			if(!item.id || !item.model){
				throw new Error('form item setting invalid');
			}
		}
	});
	if(!settings){
		throw new Error('settings invalid');
	}
}