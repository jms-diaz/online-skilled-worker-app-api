const Job = require('../models/User');

/**
 * @DESC Create a job
 */
const createJob = async (jobDetails, req, res) => {
	try {
		const newJob = new Job({
			...jobDetails
		});

		await newJob.save();
		return res.status(201).json({
			message: 'Job listing has been created',
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Unable to create job listing.',
			success: false
		});
	}
};

module.exports = {
	createJob
};
