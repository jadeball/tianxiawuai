find / -name mongodb

/work/jade/db

//启动


//备份数据库
mongodump -d tianxiawuai -o tianxiawuai_dump

//导入数据库
./mongodb-osx-x86_64-2.4.6/bin/mongorestore -h 127.0.0.1 --directoryperdb ./back/tianxiawuai_dump/

db.users.update({name:'xunmin'},{'$set':{level:'expert'}},false,true)