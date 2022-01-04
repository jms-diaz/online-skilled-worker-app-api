const { Schema, model } = require('mongoose');

const ExperienceSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		companyName: {
			type: String,
			required: true
		},
		positionTitle: {
			type: String,
			required: true
		},
		joinedDurationStart: {
			type: String,
			required: true
		},
		joinedDurationEnd: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		},
		industry: {
			type: String,
			required: true
		},
		experienceDescription: {
			type: String
		}
	},
	{ timestamps: true }
);

module.exports = model('Experience', ExperienceSchema);
