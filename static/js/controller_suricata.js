function get_normalAndAbnormal(){
    $.ajax({
        url: "/normalAndAbnormalFlow",
        success:function (data){
            normalAndAbnormalFlowOption.series[0].data = data.data;
            normalAndAbnormalFlowChart.setOption(normalAndAbnormalFlowOption);
        },
        error:function (){

        }
    })
}

get_normalAndAbnormal()