# -*- codeing = utf-8 -*-
from flask import Blueprint, render_template

log_bp = Blueprint('log',__name__)

# 页面路由转发
@log_bp.route('/logAnalyze')
def logAnalyze():
    return render_template("logAnalyze.html")

# 后台通过调用utils的函数，实现和TDengine数据库的交互，返回相应页面的表格数据

