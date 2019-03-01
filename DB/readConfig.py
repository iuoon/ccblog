import os, configparser

path = os.path.split(os.path.realpath(__file__))[0]#得到readConfig.py文件的上级目录
config_path = os.path.join(path, 'config.ini')#得到配置文件目录，配置文件目录为path下的\config.ini
config = configparser.ConfigParser()#调用配置文件读取
config.read(config_path, encoding='utf-8')

class ReadConfig():

    def get_mysql(self, name):
        value = config.get('DATABASE', name)#通过config.get拿到配置文件中DATABASE的name的对应值
        return value


if __name__ == '__main__':
    print('path值为：', path)#测试path内容
    print('config_path', config_path)#打印输出config_path测试内容是否正确
    print('通过config.get拿到配置文件中DATABASE的host的对应值:', ReadConfig().get_mysql('host'))
