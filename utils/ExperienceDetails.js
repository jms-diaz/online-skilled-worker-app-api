const Worker = require('../models/Worker');

const postWorkerExperience = async (expDetails, res) => {
	try {
		const worker = await Worker.findOne({
			fullName: expDetails.name
		});
		await worker.experience.push(expDetails);
		await worker.save();
		return res.status(201).json({
			message: 'Experience details has been added',
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Unable to add experience details.',
			success: false
		});
	}
};

module.exports = {
	postWorkerExperience
};
