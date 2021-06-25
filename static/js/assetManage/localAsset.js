var LocalChart = echarts.init(document.getElementById('Local'));

var data = [];

var LocalOption = {
    xAxis: {
        max: 'dataMax',
        axisLabel:{
            color: 'white'
        },
        splitLine:{show:false}
    },
    yAxis: {
        type: 'category',
        axisLabel:{
            color: 'white'
        },
        // data: ['北京','天津','上海','重庆','河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南','四川','贵州','云南'],
        data: [],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 23// only the largest 3 bars will be displayed
    },
    // grid: {
    //     left: '0%',
    //     right: '0%',
    //     top: '0%',
    //     bottom: '0%',
    //     containLabel: true
    // },
    series: [{
        realtimeSort: true,
        name: 'X',
        color: 'white',
        itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#76EEC6'},
                        {offset: 0.5, color: '#B0E2FF'},
                        {offset: 1, color: '#4F4F4F'}
                    ]
                )
        },
        type: 'bar',
        data: data,
        label: {
            show: true,
            position: 'right',
            valueAnimation: true,
            textStyle:{
                color:'#FFFFFF',
            }
        }
    }],
    legend: {
        show: false
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};



LocalChart.setOption(LocalOption);
