const { Schema, model } = require('mongoose');

const WorkerSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
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
		universityName: {
			type: String,
			required: true
		},
		qualification: {
			type: String,
			required: true
		},
		graduationDate: {
			type: Date,
			required: true
		},
		universityLocation: {
			type: String,
			required: true
		},
		fieldOfStudy: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = model('Worker', WorkerSchema);
