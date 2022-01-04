const { Schema, model } = require('mongoose');

const CustomerSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
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
		}
	},
	{ timestamps: true }
);

module.exports = model('Customer', CustomerSchema);
