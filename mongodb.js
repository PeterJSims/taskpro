const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
//Using localhost instead of the IP of localhost above avoids some bizarre problems/bugs when using mongodb local
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) return console.log('Unable to connect to database');

	const db = client.db(databaseName);

	// db
	// 	.collection('users')
	// 	.deleteMany({
	// 		age: 36
	// 	})
	// 	.then((res) => console.log(res))
	// 	.catch((err) => console.lor(err));

	db
		.collection('tasks')
		.deleteOne({
			description: 'Get breakfast'
		})
		.then((res) => console.log(res.deletedCount))
		.catch((err) => console.log(err));
});
