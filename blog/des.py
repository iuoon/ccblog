import jwt
import time

secret = 'asnbtzkm'

def enc(msg):
    expire_time = int(time.time() + 3600)  # 1 小时后超时
    msg['exp']=expire_time
    encoded = jwt.encode(msg, secret, algorithm='HS256')
    encoded_str = str(encoded, encoding='ascii')
    return encoded_str

def dec(msg):
    info={}
    try:
       info = jwt.decode(msg, secret, algorithm='HS256')
       return info
    except :
        print('解析失败:', msg)
    return info



