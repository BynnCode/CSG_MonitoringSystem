# -*- codeing = utf-8 -*-
from flask import Flask
from apps import settings
from apps.asset import asset_bp
from apps.controller import utils
from apps.flow import flow_bp
from apps.log import log_bp
from apps.monitor import monitor_bp
from apps.suricata import suricata_bp


def create_app():
    app = Flask(__name__,template_folder='../templates',static_folder='../static')  #flask创建对象
    app.config.from_object(settings)    #加载配置

    # 注册蓝图
    app.register_blueprint(flow_bp)
    app.register_blueprint(suricata_bp)
    app.register_blueprint(asset_bp)
    app.register_blueprint(log_bp)
    app.register_blueprint(monitor_bp)

    return app