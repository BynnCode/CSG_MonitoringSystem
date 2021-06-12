var packetLabelPerMinuteChart = echarts.init(document.getElementById('packet_of_label'));
var packetLabelPerMinuteOption;

packetLabelPerMinuteOption = {
    tooltip: {
        trigger: 'axis',
        position: function (point, params, dom, rect, size) {
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置
            var pointX = point[0];
            var pointY = point[1];
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            if (boxWidth > pointX) {
                x = 5;
             } else { // 左边放的下
                x = pointX - boxWidth;
             }
             if (boxHeight > pointY) {
                y = 5;
             } else { // 上边放得下
                y = pointY - boxHeight;
             }

             return [x, y];
          }
    },
    legend: {
        data: ['label_2', 'label_10', 'label_19', 'label_18', 'label_16','label_4','label_13'],
        x:'left',
        y:'bottom',
        left:'5%',
        textStyle: {
            fontSize: 10,
            color:'#fff'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top:'5%',
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        type: 'category',
        axisLabel:{
            color: 'white'
        },
        boundaryGap: false,
        data: [ '18:27', '18:28','18:29','18:30','18:31','18:32','18:33','18:34','18:35','18:36',
                '18:37', '18:38','18:39','18:40','18:41','18:42','18:43','18:44','18:45','18:46',
                '18:47', '18:48','18:49','18:50','18:51','18:52','18:53','18:54','18:55','18:56',
                '18:57', '18:58','18:59','19:00','19:01','19:02','19:03','19:04','19:05','19:06',
                '19:07', '19:08','19:09','19:10','19:11','19:12','19:13','19:14','19:15','19:16',
                '19:17', '19:18','19:19','19:20','19:21','19:22','19:23','19:24','19:25','19:26',
                '19:27'
                ]
    },
    yAxis: {
        type: 'value',
        axisLabel:{
            color: 'white'
        },
        splitLine: {
                show: false
        }
    },
    series: [
        {
            name: 'label_2',
            type: 'line',
            symbol: 'none',
            // stack: '总量',
            data: []
        },
        {
            name: 'label_10',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            data: []
        },
        {
            name: 'label_19',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            data: []
        },
        {
            name: 'label_18',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            data: []
        },
        {
            name: 'label_16',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            data: []
        },
        {
            name: 'label_4',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            data: []
        },
        {
            name: 'label_13',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            data: []
        }


    ]
};

packetLabelPerMinuteChart.setOption(packetLabelPerMinuteOption);