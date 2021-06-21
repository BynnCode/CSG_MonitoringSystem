# -*- codeing = utf-8 -*-
import taos
import random
#配置TDengine的全局主机名
hostname = "td1"

#连接数据库
def get_conn():
    conn = taos.connect(host=hostname, user="root", password="taosdata", config="C:\\TDengine\\cfg")
    cursor = conn.cursor()
    return conn,cursor
#关闭数据库
def close_conn(conn,cursor):
    if cursor:
        cursor.close()
    if conn:
        conn.close()
#数据库查询
def query(database,sql):
    conn, cursor = get_conn()
    try:
        cursor.execute(database)
        cursor.execute(sql)
    except Exception as err:
        cursor.close()
        conn.close()
        raise (err)
    datalist = cursor.fetchall()
    close_conn(conn, cursor)
    return datalist

def get_queryAssetProportionData():
    database = 'use suricata'
    sql = 'select * from suricata.t_bfwzc'
    res = query(database,sql)
    return res

def get_flowTimeRankData():
    database = 'use suricata'
    sql = 'select * from suricata.t_dqllqs'
    res = query(database,sql)
    return res

def get_testMapData():
    database = 'use suricata'
    sql = 'select * from suricata.t_lldqfb'
    res = query(database, sql)
    return res

def tesMapDataJson():
    res = get_testMapData()
    testMapData = []
    d1, d2, d3, d4, d5, d6, d7 = {}, {}, {}, {}, {}, {}, {}
    for re in res:
        d1[re[1]] = re[2]
        d2[re[1]] = re[3]
        d3[re[1]] = re[4]
        d4[re[1]] = re[5]
        d5[re[1]] = re[6]
        d6[re[1]] = re[7]
        d7[re[1]] = re[8]
    testMapData.append(d1)
    testMapData.append(d2)
    testMapData.append(d3)
    testMapData.append(d4)
    testMapData.append(d5)
    testMapData.append(d6)
    testMapData.append(d7)
    return testMapData


def get_flowHotpoint():
    database = 'use suricata'
    sql = 'select city,d1,d2,d3,d4,d5,d6,d7 from suricata.t_lldqfb'
    # res返回七天内前十排名的城市
    res = []
    temp = query(database, sql)
    for y in range(1,8):

        medium = []
        temp = sorted(temp, key=(lambda x: x[y]))
        temp.reverse()
        for t in temp[0:10]:
            medium.append((t[0:1]+t[y:y+1]))
        res.append(medium)
    return res

def get_normalAndAbnormalFlow():
    database = 'use suricata'
    sql = 'select * from suricata.t_zcyclltj'
    temp = query(database, sql)
    res = []
    res.append({"value":temp[0][1],"name":'正常流量'})
    res.append({"value":temp[0][2],"name":'异常流量'})
    return res

def get_attackType():
    database = 'use suricata'
    sql = 'select * from suricata.t_gjlxtj'
    res = query(database, sql)
    return {"dos":res[0][1],"brute_force":res[0][2],"info_detection":res[0][3],"virus_trojan":res[0][4],"application_attacks":res[0][5],"others":res[0][6]}

def get_attackDisplay():
    database = 'use suricata'
    sql = 'select * from suricata.t_gjzs'
    med = query(database, sql)
    res = []
    for tup in med:
        temp = []
        temp.append({'name': tup[1]})
        temp.append({'name': tup[2], 'value': tup[3]})
        res.append(temp)
    return res

def get_terminal_label():
    database = 'use terminal_behavior'
    sql0 = 'select count(*) from packet_info_connection'
    total = query(database, sql0)[0][0]
    sql1 = 'select label,count(*) from terminal_behavior.packet_info_connection group by label'
    num = query(database, sql1)
    return {
            "label"+str(num[0][0]):round(num[0][1]/total,5),
            "label"+str(num[1][0]):round(num[1][1]/total,5),
            "label"+str(num[2][0]):round(num[2][1]/total,5),
            "label"+str(num[3][0]):round(num[3][1]/total,5),
            "label"+str(num[4][0]):round(num[4][1]/total,5),
            "label"+str(num[5][0]):round(num[5][1]/total,5),
            "label"+str(num[6][0]):round(num[6][1]/total,5)
        }

def get_packetOneLabelPerMinute(num):
    database = 'use terminal_behavior'
    sql = "select count(*) from packet_info_connection  where ts>= '2021-01-04 18:27:46.483' and ts < '2021-01-04 19:27:46.559' and label={} interval(1m) fill(prev)".format(num)
    res = []
    for temp in  query(database,sql):
        if temp[1] == None:
            res.append(0)
        else:
            res.append(temp[1])
    return res

def get_packetTotalLabelPerMinute():
    total = []
    total.append(get_packetOneLabelPerMinute(2))
    total.append(get_packetOneLabelPerMinute(10))
    total.append(get_packetOneLabelPerMinute(19))
    total.append(get_packetOneLabelPerMinute(18))
    total.append(get_packetOneLabelPerMinute(16))
    total.append(get_packetOneLabelPerMinute(4))
    total.append(get_packetOneLabelPerMinute(13))
    return total


if __name__ == '__main__':
    for i in get_flowHotpoint():
        print(i)
    # temp = []
    # temp.append({'name':'by','value':2})
    # temp.append({'name':'b','value':3})
    # temp[0]['value'] = 4
    # print(temp[0])
    # print(res[0:10])
    # viewAssetData = []
    # res_queryAsset = get_queryAssetProportionData()
    # for i in range(len(res_queryAsset)):
    #     if (i == 0):
    #         continue
    #     temp = {"value": res_queryAsset[i][2], "name": res_queryAsset[i][1]}
    #     viewAssetData.append(temp)
    # print(viewAssetData)