const Worker = require('../models/Worker');

// FIX worker education
const postWorkerEducation = async (educDetails, res) => {
	try {
		const name = educDetails.name;
		const worker = await Worker.findOne({
			fullName: name
		});
		await worker.education.push(educDetails);
		await worker.save();
		return res.status(201).json({
			message: 'Education details has been added',
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Unable to add education details.',
			success: false
		});
	}
};

module.exports = {
	postWorkerEducation
};
