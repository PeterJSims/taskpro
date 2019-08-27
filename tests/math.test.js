const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('Calculate total with tip', () => {
	const total = calculateTip(10, 0.3);
	expect(total).toBe(13);
});

test('Second calculate total', () => {
	const total = calculateTip(20);
	expect(total).toBe(24);
});

test('Should convert 32f to 0C', () => {
	const temp = fahrenheitToCelsius(32);
	expect(temp).toBe(0);
});

test('Should convert 0C to 32F', () => {
	const temp = celsiusToFahrenheit(0);
	expect(temp).toBe(32);
});

// test('async test demo', (iAmTheWayJestKnowsImAsync) => {
// 	setTimeout(() => {
// 		expect(1).toBe(2);
// 		iAmTheWayJestKnowsImAsync();
// 	}, 2000);
// });

test('Should add two numbers', (done) => {
	add(4, 5).then((sum) => {
		expect(sum).toBe(9);
		done();
	});
});

//More common than above
test('Should add two numbers async/await', async () => {
	const sum = await add(3, 5);
	expect(sum).toBe(8);
});
