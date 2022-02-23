const { Schema, model } = require('mongoose');

const JobSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		jobTitle: {
			type: String,
			required: true
		},
		jobDescription: {
			type: String,
			required: true
		},
		jobLocation: {
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
		completed: {
			type: Boolean,
			default: false
		},
		paid: {
			type: Boolean,
			default: false
		},
		takenBy: {
			type: String
		}
	},
	{ timestamps: true }
);

module.exports = model('Job', JobSchema);
