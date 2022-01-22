const { Schema, model } = require('mongoose');

const EducationSchema = new Schema({
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
});

module.exports = model('Education', EducationSchema);
