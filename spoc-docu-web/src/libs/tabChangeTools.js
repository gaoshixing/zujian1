let pageNo1 = 1;
let pageNo2 = 1;
let pageNo3 = 1;

let pageSize1 = 10;
let pageSize2 = 10;
let pageSize3 = 10;

/*
* 功能 ==> 切换tab 记录状态
*/
export function pageChanges(tab, _this, index) {
	_this.pageNo = index;
	switch (tab) {
		case '1':
			pageNo1 = index;
			break;
		case '2':
			pageNo2 = index;
			break;
		case '3':
			pageNo3 = index;
			break;
	};
	return getOptions(_this);
};

/*
* pageSize 切换
* @param tab 
* @param val 分页大小
*/
export function pageSizeChanges(tab, _this, val) {
	_this.pageSize = val;
	switch (tab) {
		case '1':
			pageSize1 = val;
			break;
		case '2':
			pageSize2 = val;
			break;
		case '3':
			pageSize3 = val;
			break;
	};
};
/*
* 
*/
export function tabChanges(tab, _this) {
	switch (tab) {
		case '1': 
			_this.pageNo = pageNo1;
			_this.pageSize = pageSize1;
			break;
		case '2':
			_this.pageNo = pageNo2;
			_this.pageSize = pageSize2;
			break;
		case '3':
			_this.pageNo = pageNo3;
			_this.pageSize = pageSize3;
			break;
	};
	return getOptions(_this);
};
/*
* 接口参数的处理
* @params pageNo 当前页数
* @params pageSize 当前页数据条数
* @params beginDate 开始时间
* @params endDate 结束时间
* @params searchVal 搜索关键字
* @params .Id 分公司,服务组,顾问ID
*/
export function getOptions(_this) {
	let data = {
		pageNo: _this.pageNo,
		pageSize: _this.pageSize,
	};
	if (_this.startDate && _this.endDate) {
		data.beginDate = _this.startDate;
		data.endDate = _this.endDate;
	}
	if (_this.searchVal) {
		data.keyword = _this.searchVal;
	}
	if (_this.tags && _this.tags.length) {
		data.searchTags = _this.tags;
	}
	if (_this.companyId) {
		data.companyId = _this.companyId;
	}
	if (_this.docuGroupId) {
		data.groupId = _this.docuGroupId;
	}
	if (_this.docuConsultantId) {
		data.teacherId = _this.docuConsultantId;
	}
	return data;
};

/*
* 跳转到学生的档案页面
*/
export function goingToStudentDetail(studentId, _this) {
	const { href } = _this.$router.resolve({
		name: 'docu.addStudent',
		query: {
			studentId,
		},
	});
	window.open(href, '_blank');
};


/*
*
*/
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
            fall&&fall(times);
        }
    }
    funwarp();
}