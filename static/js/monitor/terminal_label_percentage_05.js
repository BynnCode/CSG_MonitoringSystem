var labelPercentageChart5 = echarts.init(document.getElementById('label_percentage_05'));

var labelPercentageOption5 = {
	backgroundColor: '#070b12',
	series: [{
		type: 'gauge',
		startAngle: 180,
		endAngle: 0,
		min: 0,
		max: 1,
		splitNumber: 10,
		axisLine: {
			lineStyle: {
				width: 10,
				color: [
					 //[0.25, '#FF6E76'],
                    [0.4, '#4DB34D'],
                    //[0.75, '#58D9F9'],
                    [1, '#FF0000']
				]
			}
		},
		center: ['50%', '75%'],
		radius: ['85'],
		pointer: {
			length: '55%',
			width: 3,
			offsetCenter: [10, '-30%'],
			itemStyle: {
				color: 'auto'
			}
		},
		axisTick: {
			length: 12,
			lineStyle: {
				color: 'auto',
				width: 1
			}
		},
		splitLine: {
			length: 18,
			lineStyle: {
				color: 'auto',
				width: 3
			}
		},
		axisLabel: {
			color: '#fff',
			fontSize: 8,
			distance: -30,
			formatter: function(value) {

			}
		},
		title: {
			color:['#fff'],
			offsetCenter: [0, '30%'],
			fontSize: 15
		},
		detail: {
			fontSize: 15,
			offsetCenter: [0, '-28%'],
			valueAnimation: true,
			formatter: function(value) {
				return (value*100).toFixed(3) + '%'; /////这里就要在数据库里新建一张表，将packet数量拿出来，显示的时候显示各个lable的packet数量，但是在表盘中显示就要输入百分比。
			},
			color: 'auto'
		},
		data: [{
			value: 0,
			name: 'Label:16'
		}]
	}]
};


labelPercentageChart5.setOption(labelPercentageOption5);
