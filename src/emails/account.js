const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'ragtimesims@gmail.com',
		subject: 'Welcome to TaskPro!',
		text: `Welcome to TaskPro, ${name}. You just took your first step to greater productivity!`
	});
};

const sendCancelEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'ragtimesims@gmail.com',
		subject: 'Sorry to see you go',
		text: `${name}, we are sorry to see you go but thank you for using our service. Please contact us to know if there were ways we could improve.`
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancelEmail
};
