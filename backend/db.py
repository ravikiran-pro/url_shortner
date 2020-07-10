import sqlite3

__db__={
        'name':'shortner',
        'table':'manager'}

def generate_tokens():
    import secrets
    return secrets.token_urlsafe(5)

class DB:
    def __init__(self):
        self.conn=sqlite3.connect(__db__['name'])
        self.cursor=self.conn.cursor()

    def Queryadd(self,token,url):
        query="insert into {}(token,url) values('{}','{}')"
        query=query.format(__db__['table'],token,url) 
        self.cursor.execute(query)
        self.conn.commit()

    def Queryget(self,token):
        query="select * from {} where token='{}'"
        query=query.format(__db__['table'],token)
        res=self.cursor.execute(query)
        return res.fetchone()[2]
        
    def get(self,token):
        return self.Queryget(token)

    def add(self,url):
        self.token=generate_tokens()
        self.Queryadd(self.token,url)
        return self.token

