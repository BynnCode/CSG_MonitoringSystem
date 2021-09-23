var topHostsChart = echarts.init(document.getElementById('topHosts'));

var topHostsOption = {
  title: {
    text: '流数排名前10主机',
    textStyle: {
        fontSize: 18,
        fontWeight: 'bolder',
        color: '#F8F8FF'                             // 主标题文字颜色
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#F8F8FF',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
    splitLine:{
　　　　  show:false
　　 },
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#F8F8FF',//左边线的颜色
                        width:'1'//坐标线的宽度
                    }
                },
    splitLine:{
　　　　  show:false
　　 },
    data: [
      '192.168.1.2',
      '178.62.3.29',
      '175.24.84.198',
      '172.17.0.16',
      '173.24.56.72',
      '178.35.84.125',
      '192.168.2.1',
      '192.21.3.21',
      '172.21.82.196',
      '174.18.1.12'
    ]
  },
  series: [
    {
      name: '',
      type: 'bar',
      color: 'white',
      data: [
        18203, 23489, 29034, 104970, 131744, 630230, 648203, 653489, 669034,
        724970
      ]
    }
  ]
};

topHostsChart.setOption(topHostsOption);
