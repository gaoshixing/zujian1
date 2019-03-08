var context='/spoc-plan';
var interfaceUrl={
	basicData:{
		dictListData:context+'/a/ws/sys/dict/listData',
		getMenu:context+'/a/ws/sys/menu/listGrantMenu',
	},
    
	xxGroup:{
		save:context+'/a/ws/common/comGroup/save',
		deleteXxGroup:context+'/a/ws/common/comGroup/delete',
		deleteXxGroupUser:context+'/a/ws/common/comGroupUser/delete',
		treeUserData:context+'/a/ws/common/comGroupUser/treeUserData',
		batchsaveXxGroupUser:context+'/a/ws/common/comGroupUser/batchsave',
		officeList:context+'/a/ws/sys/office/list',
		treeAddUserData:context+'/a/ws/common/comGroupUser/treeAddUserData',
		treeAddUserOffice:context+'/a/ws/common/comGroupUser/treeAddUserOffice',
		setLeaderFlag:context+'/a/ws/common/comGroupUser/setLeaderFlag',
		setCheckFlag:context+'/a/ws/common/comGroupUser/setCheckFlag',
		order: context+'/a/ws/common/comGroup/updateSort',
	},
};
export default interfaceUrl;
