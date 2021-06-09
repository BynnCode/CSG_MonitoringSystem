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
		radius: ['80'],
		pointer: {
			icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
			length: '45%',
			width: 1,
			offsetCenter: [0, '-40%'],
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
			length: 15,
			lineStyle: {
				color: 'auto',
				width: 2
			}
		},
		axisLabel: {
			color: '#464646',
			fontSize: 20,
			distance: -60,
			formatter: function(value) {
				if (value === 0.875) {
					return '优';
				} else if (value === 0.625) {
					return '中';
				} else if (value === 0.375) {
					return '良';
				} else if (value === 0.125) {
					return '差';
				}
			}
		},
		title: {
			offsetCenter: [0, '-20%'],
			fontSize: 10
		},
		detail: {
			fontSize: 15,
			offsetCenter: [0, '0%'],
			valueAnimation: true,
			formatter: function(value) {
				return Math.round(value * 100) + '分'; /////这里就要在数据库里新建一张表，将packet数量拿出来，显示的时候显示各个lable的packet数量，但是在表盘中显示就要输入百分比。
			},
			color: 'auto'
		},
		data: [{
			value: 0.65,
			name: 'Lable:2'
		}]
	}]
};


labelPercentageChart5.setOption(labelPercentageOption5);
