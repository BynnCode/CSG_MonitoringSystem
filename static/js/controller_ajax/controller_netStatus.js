function get_terminalNetRate(){
    $.ajax({
        url:'/terminalNetRate',
        success: function (data) {
            $(".Num h1").eq(0).text(data.data.uplinkrate)
            $(".Num h1").eq(2).text(data.data.downlinkrate)
            // $(".Num h1").eq(2).text(data.data.uplinkrate)
        },
        error: function () {

        }
    })
}

function get_terminalTotalStatics(){
    $.ajax({
        url:'/terminalTotalStatics',
        success: function (data) {
            $(".Num h1").eq(4).text(data.data.warnflow)
            $(".Num h1").eq(5).text(data.data.localhost)
            $(".Num h1").eq(6).text(data.data.remotehost)
            $(".Num h1").eq(7).text(data.data.onlineNum)
            $(".Num h1").eq(8).text(data.data.offline)
            $(".Num h1").eq(9).text(data.data.activeFlow)
        },
        error: function () {

        }
    })
}

setInterval(get_terminalNetRate,1000)
setInterval(get_terminalTotalStatics,1000 * 5)