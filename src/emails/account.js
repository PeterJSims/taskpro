const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
	to: 'ragtimesims@gmail.com',
	from: 'important@gmail.com',
	subject: 'This is my first Sendgril email',
	text: 'Here is my inaugural email using Sendgrid. I hope it works!'
});
