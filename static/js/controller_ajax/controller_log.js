function get_numberOfAlarm(){
    $.ajax({
        url: "/numberOfAlarm",
        success:function (data){


            numberOfAlarmsOption.xAxis.data = data.data[0];
            numberOfAlarmsOption.series[0].data = data.data[1];

            numberOfAlarmsChart.setOption(numberOfAlarmsOption);
        },
        error:function (){

        }
    })
}

function get_numberOfAlarmsAdded(){
    $.ajax({
        url: "/numberOfAlarmsAdded",
        success:function (data){


            numberOfAlarmAddOption.xAxis.data = data.data[0];

            numberOfAlarmAddOption.series[0].data = data.data[1];
            numberOfAlarmAddOption.series[1].data = data.data[2];
            numberOfAlarmAddOption.series[2].data = data.data[3];

            numberOfAlarmAddChart.setOption(numberOfAlarmAddOption);
        },
        error:function (){

        }
    })
}

function get_evaluationStatics(){
    $.ajax({
        url: "/evaluationStatics",
        success:function (data){


            evaluationStatisticsOption.xAxis.data = data.data[0];

            evaluationStatisticsOption.series[0].data = data.data[1];
            evaluationStatisticsOption.series[1].data = data.data[2];

            evaluationStatisticsChart.setOption(evaluationStatisticsOption);
        },
        error:function (){

        }
    })
}

function get_numberOfAlarmsIP(){
    $.ajax({
        url: "/numberOfAlarmsIP",
        success:function (data){
            console.log(data)

            numberOfAlarmIPOption.yAxis.data = data.data[0];
            numberOfAlarmIPOption.series[0].data = data.data[1];

            numberOfAlarmIPChart.setOption(numberOfAlarmIPOption);
        },
        error:function (){

        }
    })
}

get_numberOfAlarm();
get_numberOfAlarmsAdded();
get_evaluationStatics();
get_numberOfAlarmsIP();

