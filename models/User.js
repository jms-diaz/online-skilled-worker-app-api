const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		email: { type: String, unique: true },
		password: { type: String },
		role: {
			type: String,
			default: 'worker',
			enum: [ 'worker', 'customer', 'admin' ]
		},
		customer_temp_id: {
			type: Schema.Types.ObjectId,
			ref: 'Customer'
		},
		worker_temp_id: {
			type: Schema.Types.ObjectId,
			ref: 'Worker'
		}
	},
	{ timestamps: true }
);

module.exports = model('User', UserSchema);
