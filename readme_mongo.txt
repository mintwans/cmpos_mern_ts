# installation macOS using homebrew
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start mongodb-community@5.0
brew services stop mongodb-community@5.0





show dbs;
cls
use <db_name>
show collections;
db.course.insertOne({name: "java", price: 10})
db.course.find()
db.course.find().pretty()
exit
db.dropDatabase();