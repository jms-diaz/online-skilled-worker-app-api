const { Schema, model } = require('mongoose');

const JobSchema = new Schema(
	{
		positionTitle: {
			type: String,
			required: true
		},
		employmentType: {
			type: String,
			required: true
		},
		jobSpecialization: {
			type: String,
			required: true
		},
		jobRole: {
			type: String,
			required: true
		},
		monthlySalary: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = model('Job', JobSchema);
