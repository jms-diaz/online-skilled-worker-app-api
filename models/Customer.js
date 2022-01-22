const { Schema, model } = require('mongoose');
const job = require('./Job');

const CustomerSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		profilePicture: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		latitude: {
			type: Number
		},
		longitude: {
			type: Number
		},
		contactNumber: {
			type: Number,
			required: true
		},
		gender: {
			type: String,
			required: true
		},
		bio: {
			type: String
		},
		jobsCreated: [ job.schema ]
	},
	{ timestamps: true }
);

module.exports = model('Customer', CustomerSchema);
