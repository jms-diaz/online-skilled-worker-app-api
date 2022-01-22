const { Schema, model } = require('mongoose');
const education = require('./Education');
const experience = require('./Experience');
const job = require('./Job');

const WorkerSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true
		},
		profilePicture: {
			type: String,
			required: true
		},
		contactNumber: {
			type: Number,
			required: true
		},
		gender: {
			type: String,
			required: true
		},
		occupation: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		latitude: {
			type: Number,
			required: true
		},
		longitude: {
			type: Number,
			required: true
		},
		verified: {
			type: Boolean,
			default: false
		},
		education: [ education.schema ],
		experience: [ experience.schema ],
		jobsTaken: [ job.schema ]
	},
	{ timestamps: true }
);

module.exports = model('Worker', WorkerSchema);
