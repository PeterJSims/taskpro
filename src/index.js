const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});

//thisisajwttoken

// /Users/Home/mongodb/bin/mongod --dbpath=/Users/Home/mongodb-data
