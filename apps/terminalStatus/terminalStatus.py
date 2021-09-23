from flask import Blueprint,render_template,jsonify
from apps.controller import utils
import random


terminalStatus_bp = Blueprint('terminalStatus',__name__)




@terminalStatus_bp.route('/terminalStatus')
def netTraffic():
    return render_template("terminalStatus.html")

# @netStatus_bp.route()

@terminalStatus_bp.route('/terminalNetRate', methods=['get', 'post'])
def get_terminalNetRate():
    uplinkrate = format(random.uniform(10,60),".2f")
    downlinkrate = format(random.uniform(10,100),".2f")
    # uplinkrate,downlinkrate,warnflow,localhost,remotehost,onlinenum,offline,activeflow

    temp = {"uplinkrate":uplinkrate,"downlinkrate":downlinkrate}


    return jsonify({"data":temp})

@terminalStatus_bp.route('/terminalTotalStatics',methods=['get', 'post'])
def get_terminalTotalStatics():

    warnFlow = random.randint(0,20)
    localHost = random.randint(20,80)
    remoteHost = random.randint(100,300)
    onlineNum = random.randint(0,100)
    offline = random.randint(0,40)
    activeFlow = random.randint(1000,10000)

    temp = {"warnflow":warnFlow,"localhost":localHost,"remotehost":remoteHost,"onlineNum":onlineNum,"offline":offline,"activeFlow":activeFlow}

    return jsonify({"data":temp})




