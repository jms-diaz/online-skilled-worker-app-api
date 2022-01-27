const Customer = require('../models/Customer');
const Job = require('../models/Job');
const Worker = require('../models/Worker');

/**
 * @DESC Create a job
 */
const createJob = async (jobDetails, res) => {
	try {
		console.log(jobDetails);
		const customer = await Customer.findOne({
			name: jobDetails.name
		});
		await customer.jobsCreated.push(jobDetails);
		await customer.save();

		const newJob = new Job(jobDetails);
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

const hireWorker = async (details, res) => {
	try {
		const customerName = details.customerName;
		const workerName = details.workerName;
		const jobTitle = details.selectedJob;

		// get job from db
		let job = await Job.findOneAndUpdate({ jobTitle: jobTitle }, { takenBy: workerName }, { new: true });

		// push job into worker
		const worker = await Worker.findOne({ fullName: workerName });
		await worker.jobsTaken.push(job);
		await worker.save();

		// update customer created jobs
		await Customer.findOneAndUpdate(
			{ name: customerName },
			{ $set: { 'jobsCreated.$[job].takenBy': workerName } },
			{ arrayFilters: [ { 'job.jobTitle': jobTitle } ], new: true }
		);

		return res.status(200).json({
			message: 'Worker has been hired',
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No workers found.',
			success: false
		});
	}
};

const applyWorker = async (details, res) => {
	try {
		console.log(details);
		const customerName = details.customerName;
		const workerName = details.workerName;
		const jobTitle = details.jobTitle;

		// get job from db
		let job = await Job.findOneAndUpdate({ jobTitle: jobTitle }, { takenBy: workerName }, { new: true });
		console.log(job);

		// push job into worker
		const worker = await Worker.findOne({ fullName: workerName });
		await worker.jobsTaken.push(job);
		await worker.save();

		// update customer created jobs
		await Customer.findOneAndUpdate(
			{ name: customerName },
			{ $set: { 'jobsCreated.$[job].takenBy': workerName } },
			{ arrayFilters: [ { 'job.jobTitle': jobTitle } ], new: true }
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No workers found.',
			success: false
		});
	}
};

const getJobs = async (req, res) => {
	try {
		let jobs = await Job.find();
		res.status(200).json(jobs);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No jobs found.',
			success: false
		});
	}
};

const getPendingJobs = async (req, res) => {
	try {
		let jobs = await Job.find({ completed: false });
		res.status(200).json(jobs);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No jobs found.',
			success: false
		});
	}
};

const searchJobs = async (req, res) => {
	try {
		const jobTitle = req.query.jobTitle;
		const jobLocation = req.query.jobLocation;
		let jobs = await Job.find({
			jobTitle: { $regex: jobTitle, $options: 'i' },
			jobLocation: { $regex: jobLocation, $options: 'i' }
		});
		res.status(200).json(jobs);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No jobs found.',
			success: false
		});
	}
};

const markJobAsComplete = async (details, res) => {
	try {
		const customerName = details.customerName;
		const workerName = details.workerName;
		const jobTitle = details.jobTitle;

		let job = await Job.findOneAndUpdate({ jobTitle: jobTitle }, { completed: true }, { new: true });

		await Customer.findOneAndUpdate(
			{ name: customerName },
			{ $set: { 'jobsCreated.$[job].completed': true } },
			{ arrayFilters: [ { 'job.jobTitle': jobTitle } ], new: true }
		);

		await Worker.findOneAndUpdate(
			{ fullName: workerName },
			{ $set: { 'jobsTaken.$[job].completed': true } },
			{ arrayFilters: [ { 'job.jobTitle': jobTitle } ], new: true }
		);

		res.status(200).json(job);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Something went wrong.',
			success: false
		});
	}
};

const markJobAsPaid = async (details, res) => {
	try {
		const customerName = details.customerName;
		const workerName = details.workerName;
		const jobTitle = details.jobTitle;

		let job = await Job.findOneAndUpdate({ jobTitle: jobTitle }, { paid: true }, { new: true });

		await Customer.findOneAndUpdate(
			{ name: customerName },
			{ $set: { 'jobsCreated.$[job].paid': true } },
			{ arrayFilters: [ { 'job.jobTitle': jobTitle } ], new: true }
		);

		let worker = await Worker.findOneAndUpdate(
			{ fullName: workerName },
			{ $set: { 'jobsTaken.$[job].paid': true } },
			{ arrayFilters: [ { 'job.jobTitle': jobTitle } ], new: true }
		);

		res.status(200).json(job);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Something went wrong.',
			success: false
		});
	}
};

module.exports = {
	createJob,
	hireWorker,
	getJobs,
	getPendingJobs,
	markJobAsComplete,
	searchJobs,
	markJobAsPaid,
	applyWorker
};
