//端口 8080->80
//sudo ipfw add 100 fwd 127.0.0.1,8080 tcp from any to any 80 in

find / -name mongodb

/work/jade/db

//启动
./mongodb-osx-x86_64-2.4.6/bin/mongod -dbpath=./data/tianxiawuai --logpath=./log/tianxiawuai.log --logappend&

//备份数据库
mongodump -d tianxiawuai -o tianxiawuai_dump

//命令
./mongo
show dbs;
use tianxiawuai;
show collections
db.users.find();

//导入数据库
./mongodb-osx-x86_64-2.4.6/bin/mongorestore -h 127.0.0.1 --directoryperdb ./back/tianxiawuai_dump/

db.users.update({name:'xunmin'},{'$set':{level:'expert'}},false,true)
//模糊匹配 替换图标
db.users.update({avatar:/www.gravatar.com/},{'$set':{avatar:'http://www.tianxiawuai.com/public/images/logo.png'}},false,true)