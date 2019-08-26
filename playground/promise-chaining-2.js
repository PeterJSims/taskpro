require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5d5ea9fc0ed270058592e380')
// 	.then((task) => {
// 		console.log(task);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const deleteTaskAndCount = async (id) => {
	await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
};

deleteTaskAndCount('5d5ef65b6ef7c6e117024e55').then((count) => console.log(count)).catch((err) => {
	console.log(err);
});
