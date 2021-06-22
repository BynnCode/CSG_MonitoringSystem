# -*- codeing = utf-8 -*-
from flask import Blueprint, render_template, jsonify
from apps.controller import utils

log_bp = Blueprint('log',__name__)

# 页面路由转发
@log_bp.route('/logAnalyze')
def logAnalyze():
    return render_template("logAnalyze.html")

# 后台通过调用utils的函数，实现和TDengine数据库的交互，返回相应页面的表格数据
@log_bp.route('/numberOfAlarm')
def numberOfAlarm():
    numberOfAlarmData = utils.get_numberOfAlarm()
    return jsonify({"data": numberOfAlarmData})

@log_bp.route('/numberOfAlarmsAdded')
def numberOfAlarmsAdded():
    numberOfAlarmsAddedData = utils.get_numberOfAlarmsAdded()
    return jsonify({"data": numberOfAlarmsAddedData})

@log_bp.route('/evaluationStatics')
def evaluationStatics():
    evaluationStaticsData = utils.get_evaluationStatics()
    return jsonify({"data": evaluationStaticsData})

@log_bp.route('/numberOfAlarmsIP')
def numberOfAlarmsIP():
    numberOfAlarmsIPData = utils.get_numberOfAlarmsIP()
    return jsonify({"data": numberOfAlarmsIPData})
