# -*- codeing = utf-8 -*-
from flask import Blueprint, render_template, jsonify
from apps.controller import utils

suricata_bp = Blueprint('suricata',__name__)

# 页面路由转发
@suricata_bp.route('/suricata')
def suricata():
    attackDisplayData = utils.get_attackDisplay()
    return render_template("suricata.html", attackDisplayData=attackDisplayData)

# 后台通过调用utils的函数，实现和TDengine数据库的交互，返回相应页面的表格数据

@suricata_bp.route('/normalAndAbnormalFlow', methods=['get', 'post'])
def normalAndAbnormalFlow():
    normalAndAbnormalFlowData = utils.get_normalAndAbnormalFlow()
    return jsonify({"data": normalAndAbnormalFlowData})

@suricata_bp.route('/attackType', methods=['get', 'post'])
def attackType():
    attackTypeData = utils.get_attackType()
    return jsonify({"data": attackTypeData})

@suricata_bp.route('/flowTrend',methods=['get', 'post'])
def flowTrend():
    flowTrendData = utils.get_flowTrend()
    return jsonify({"data": flowTrendData})
