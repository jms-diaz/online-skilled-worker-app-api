const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		email: { type: String, unique: true },
		password: { type: String },
		role: {
			type: String,
			default: 'worker',
			enum: [ 'worker', 'customer' ]
		}
	},
	{ timestamps: true }
);

module.exports = model('User', UserSchema);
