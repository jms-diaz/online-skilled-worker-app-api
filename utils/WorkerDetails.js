const Experience = require('../models/Experience');
const Worker = require('../models/Worker');

/**
 * @DESC Register worker details
 */
const postWorkerDetails = async (workerDetails, res) => {
	try {
		console.log(workerDetails);
		const newWorker = new Worker({
			...workerDetails
		});

		await newWorker.save();
		return res.status(201).json({
			message: 'Worker registered',
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Unable to register worker.',
			success: false
		});
	}
};

const postWorkerExperience = async (workerExperience, res) => {
	try {
		console.log(workerExperience);
		const newWorkerExp = new Experience({
			...workerExperience
		});

		await newWorkerExp.save();
		return res.status(201).json({
			message: 'Experience has been saved',
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'The server is having problems.',
			success: false
		});
	}
};

/**
 * @DESC Get worker details
 */

const getWorker = async (req, res) => {
	try {
		const worker = await Worker.findById(req.params.id);
		res.status(200).json(worker);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getAllWorkers = async (req, res) => {
	try {
		let workers = await Worker.find();
		res.status(200).json(workers);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No users found.',
			success: false
		});
	}
};

module.exports = {
	postWorkerDetails,
	postWorkerExperience,
	getAllWorkers,
	getWorker
};
