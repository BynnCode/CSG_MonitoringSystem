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

get_terminalLabel()