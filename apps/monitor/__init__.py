# -*- codeing = utf-8 -*-
from flask import Blueprint, render_template, jsonify
from apps.controller import utils

monitor_bp =  Blueprint('monitor',__name__)

# 页面路由转发
@monitor_bp.route('/monitor')
def monitor():
    return render_template("monitor.html")

# 后台通过调用utils的函数，实现和TDengine数据库的交互，返回相应页面的表格数据
@monitor_bp.route('/terminalLabel', methods=['get', 'post'])
def terminalLabel():
    terminalLabelData = utils.get_terminal_label()
    # 查询返回的数据里面有七条数据，还有一个label14(数值太小，显示会出错）
    return jsonify({"data": terminalLabelData})

@monitor_bp.route('/packetLabelPerMinute', methods=['get', 'post'])
def packetLabelPerMinute():
    packetLabelPerMinuteData = utils.get_packetTotalLabelPerMinute()
    return jsonify({"data": packetLabelPerMinuteData})