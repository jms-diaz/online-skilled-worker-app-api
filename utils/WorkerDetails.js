const User = require('../models/User');
const Worker = require('../models/Worker');
const Job = require('../models/Job');

/**
 * @DESC Register worker details
 */
const postWorkerDetails = async (workerDetails, res) => {
	try {
		const newWorker = new Worker({
			...workerDetails
		});
		await newWorker.save();

		const id = workerDetails.user_id;
		const assignId = await User.findByIdAndUpdate(id, { worker_temp_id: newWorker._id.valueOf() });

		return res.status(201).json({
			objectId: newWorker._id,
			fullName: newWorker.fullName,
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

const verifyWorker = async (req, res) => {
	try {
		const name = req.query.name;
		const worker = await Worker.findOneAndUpdate({ fullName: name }, { verified: true }, { new: true });
		res.status(200).json(worker);
	} catch (err) {
		res.status(500).json(err);
	}
};

/**
 * @DESC Get worker details
 */

const getTakenJobs = async (req, res) => {
	try {
		const name = await req.query.name;
		let worker = await Worker.find({ fullName: name });
		let w = worker[0];
		const jobs = w.jobsTaken;
		res.status(200).json(jobs);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No jobs found.',
			success: false
		});
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

const getCurrentWorker = async (req, res) => {
	try {
		const user_id = req.query.user_id;
		let worker = await User.findById(user_id).populate('worker_temp_id');
		res.status(200).json(worker);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No users found.',
			success: false
		});
	}
};

const applyJobWorker = async (req, res) => {
	try {
		const name = req.query.name;
		const jobTitle = req.query.jobTitle;

		let job = await Job.find({ jobTitle: jobTitle });
		let worker = await Worker.findOne({ fullName: name });
		await worker.jobsTaken.push(job[0]);
		await worker.save();

		return res.status(201).json({
			message: 'Job has been taken',
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "There's something wrong with the server.",
			success: false
		});
	}
};

const searchWorkers = async (req, res) => {
	try {
		console.log(req.query);
		const occupation = req.query.jobTitle;
		const address = req.query.location;
		let worker = await Worker.find({
			occupation: { $regex: occupation, $options: 'i' },
			address: { $regex: address, $options: 'i' }
		});
		res.status(200).json(worker);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No workers found.',
			success: false
		});
	}
};

module.exports = {
	postWorkerDetails,
	getAllWorkers,
	getTakenJobs,
	verifyWorker,
	getCurrentWorker,
	applyJobWorker,
	searchWorkers
};
