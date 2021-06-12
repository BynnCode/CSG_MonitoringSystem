function get_terminalLabel(){
    $.ajax({
        url: "/terminalLabel",
        success:function (data){
            labelPercentageOption1.series[0].data[0].value =data.data.label2;
            labelPercentageOption2.series[0].data[0].value =data.data.label10;
            labelPercentageOption3.series[0].data[0].value =data.data.label19;
            labelPercentageOption4.series[0].data[0].value =data.data.label18;
            labelPercentageOption5.series[0].data[0].value =data.data.label16;
            labelPercentageOption6.series[0].data[0].value =data.data.label13;

            labelPercentageChart1.setOption(labelPercentageOption1);
            labelPercentageChart2.setOption(labelPercentageOption2);
            labelPercentageChart3.setOption(labelPercentageOption3);
            labelPercentageChart4.setOption(labelPercentageOption4);
            labelPercentageChart5.setOption(labelPercentageOption5);
            labelPercentageChart6.setOption(labelPercentageOption6);
        },
        error:function (){

        }
    })
}

function get_packetLabelPerMinute(){
    $.ajax({
        url: "/packetLabelPerMinute",
        success:function (data){
            packetLabelPerMinuteOption.series[0]['data'] = data.data[0];
            packetLabelPerMinuteOption.series[1]['data'] = data.data[1];
            packetLabelPerMinuteOption.series[2]['data'] = data.data[2];
            packetLabelPerMinuteOption.series[3]['data'] = data.data[3];
            packetLabelPerMinuteOption.series[4]['data'] = data.data[4];
            packetLabelPerMinuteOption.series[5]['data'] = data.data[5];
            packetLabelPerMinuteOption.series[6]['data'] = data.data[6];

            packetLabelPerMinuteChart.setOption(packetLabelPerMinuteOption);

        },
        error:function (){

        }
    })
}

get_terminalLabel()
get_packetLabelPerMinute()
