export const pieOptions = {
    // 标题区域
    title: {
        text: '这是标题', // 主标题
		right: 'center', // 位置
		left: 'center',
        top: 0, // 标题的位置
        itemGap: 90, // 副标题的top 相对于标题
        subtext: '30%', // 副标题文案
        textStyle: {
            color: '#333',
            fontSize: 14,
        },
        subtextStyle: { // 副标题样式
            color: '#333',
            fontSize: 20,
            fontWeight: 'normal',
        },
    },
    color: ['red', '#F1F1F1'],
    tooltip: {
        trigger: 'item', // item 代表了没有轴心的图形
        formatter: "{a} <br/>{b}: {c} ({d}%)" // 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    legend: {
		show: false,
        orient: 'vertical', // 图例列表的布局朝向 horizontal(水平) || vertical
        x: 'left',  // 图例列表的布局 位置 number || percent || location
        data:['直接访问','胡文义的',], // 图例列表的布局 数据
        itemGap: 10, // 图例列表的 间距
        selectedMode: 'multiple', // 点击 图例列表 选择显示
    },
    series: [
        {
            name:'访问来源', // tooltip title
			type:'pie',
			top: 20,
			center: [110, 120], // pie 圆心的位置
            radius: ['55%', '70%'], // 饼图 到 环形 的切换(胖到极致成园)
            avoidLabelOverlap: false, // 是否启用防止标签重叠策略，默认开启，在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠。
            label: {
                normal: { // 正常状态下的样式 默认不显示
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false, // 获取鼠标焦点时图形中间是否该项的标题
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold',
                        // color: 'red', // 可以统一设置颜色 背景色等样式...
                    },
                    rich: {
                        /*
                        * 富文本显示 ==> image....
                        * 看示例
                        */
                    },
                },
            },
            labelLine: { // 标签的视觉引导线样式 在 label 位置 设置为'outside'的时候会显示视觉引导线
                normal: {
                    show: false
                }
            },
            data:[
                {value:3, name:'直接访问'},
                {value:7, name:'胡文义的'},
            ]
        }
    ]
};

export const barOption = {
    color: ['black', 'green', 'yellow'],
    title: {
        text: '标题',
		subtext: '副标题',
		left: 'center',
		textStyle: {
            color: '#333',
            fontSize: 14,
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['name1',]
    },
    grid: {
        left: '3%',
        right: '10%',
        bottom: '7%',
        containLabel: true
    },
    xAxis: {
		name: '（分钟）',
        type: 'value',
        boundaryGap: [0, 0.01],
        nameLocation: 'center', // name's location
        nameGap: 25, // the gap between name and xAxis  
        nameTextStyle: {
            color: '#333',
            align: 'center',
        },
		splitLine:{ // 分割线
			show:false,
			lineStyle:{
				color:'#DCDCDC',
				width: 1,
				type: 'dotted',//虚线
			},
        },
		axisLine: { // 坐标轴线
            lineStyle: {
                type: 'solid',
                color: '#333',//左边线的颜色
                width:'2'//坐标线的宽度
            }
        },
        axisLabel: {
            textStyle: {
                color: '#333',//坐标值得具体的颜色
            }
        },
    },
    yAxis: {
		splitLine:{show: false}, // 去除网格线
		// axisLine:{show:false,},   // y 轴线
        type: 'category',
		data: ['高士行','高不行','高土行','高干行','高孬行','高嫑行'],
		splitLine:{ // 分割线
			show:false,
			lineStyle:{
				color:'#DCDCDC',
				width: 1,
				type: 'dotted',//虚线
			},
        },
		axisLine: { // 坐标轴线
            lineStyle: {
                type: 'solid',
                color: '#333',//左边线的颜色
                width:'2'//坐标线的宽度
            }
        },
        axisLabel: {
            textStyle: {
                color: '#333',//坐标值得具体的颜色
            }
        },
    },
    series: [
        {
            name: 'name1',
            type: 'bar',
            data: [1, 3, 5, 7, 9, 11]
        },
    ]
};

export function addComma(val) {
	val = String(val) ? String(val) : '0';
    if (val.length <= 3) return val;
    let arr = [];
    let index = 0;
    for (let i = val.length - 1; i--; i <=0) {
        index++;
        if (index && (index % 3 === 0)) {
            arr.unshift(val[i]);
            arr.unshift(',');
        } else {
            arr.unshift(val[i]);
        }
    }
    arr[0] === ',' ? arr.shift() : '';
    arr = arr.join('');
    return arr;
};