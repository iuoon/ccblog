from flask import Response,json

def okAndSetCookie(token):
    t = {'code': 0, "msg": '处理成功'}
    data = json.dumps(t,ensure_ascii=False)
    res = Response(data, content_type='application/json')
    res.set_cookie('blogid', token)
    return res

def ok():
    t = {'code': 0, "msg": '处理成功'}
    data = json.dumps(t,ensure_ascii=False)
    res = Response(data, content_type='application/json')
    return res

def okMsg(msg):
    t = {'code': 0, "msg": msg}
    data = json.dumps(t,ensure_ascii=False)
    res = Response(data, content_type='application/json')
    return res

def okData(data):
    t = {'code': 0,"msg": '处理成功', "data": data}
    data = json.dumps(t,ensure_ascii=False)
    res = Response(data, content_type='application/json')
    return res

def error():
    t = {'code': -1, "msg": '系统异常'}
    data = json.dumps(t,ensure_ascii=False)
    res = Response(data, content_type='application/json')
    return res

def errorMsg(msg):
    t = {'code': -1, "msg": msg}
    data = json.dumps(t,ensure_ascii=False)
    res = Response(data, content_type='application/json')
    return res

