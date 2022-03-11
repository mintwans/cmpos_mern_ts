show dbs;
cls
use <db_name>
show collections;
db.course.insertOne({name: "java", price: 10})
db.course.find()
db.course.find().pretty()
exit
db.dropDatabase();