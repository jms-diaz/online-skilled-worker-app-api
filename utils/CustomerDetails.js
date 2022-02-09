const Customer = require('../models/Customer');
const User = require('../models/User');

/**
 * @DESC Register Customer details
 */
const postCustomerDetails = async (customerDetails, res) => {
	try {
		const newCustomer = new Customer({
			...customerDetails
		});
		await newCustomer.save();

		const id = customerDetails.user_id;
		const assignId = await User.findByIdAndUpdate(id, { customer_temp_id: newCustomer._id.valueOf() });
		return res.status(201).json({
			name: newCustomer.name,
			message: 'Customer registered',
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Unable to register Customer.',
			success: false
		});
	}
};

/**
 * @DESC Get worker details
 */

const getAllCustomers = async (req, res) => {
	try {
		let customers = await Customer.find();
		return res.status(200).json(customers);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No users found.',
			success: false
		});
	}
};

const getCustomerCreatedJobs = async (req, res) => {
	try {
		const name = req.query.name;
		let createdJobs = await Customer.findOne({ name: name }).populate({ path: 'jobsCreated' });
		res.status(200).json(createdJobs);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No jobs found.',
			success: false
		});
	}
};

const getCustomerPendingJobs = async (req, res) => {
	try {
		const name = req.query.name;
		let createdJobs = await Customer.findOne({ name: name }, { 'jobsCreated.completed': false }).populate({
			path: 'jobsCreated'
		});
		console.log(createdJobs);
		res.status(200).json(createdJobs);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No jobs found.',
			success: false
		});
	}
};

const getCurrentCustomer = async (req, res) => {
	try {
		const user_id = req.query.user_id;
		let customer = await User.findById(user_id).populate('customer_temp_id');
		return res.status(200).json(customer);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No users found.',
			success: false
		});
	}
};

const getCustomer = async (req, res) => {
	try {
		const name = req.query.name;
		let customer = await Customer.findOne({
			name: name
		});
		res.status(200).json(customer);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No customer found.',
			success: false
		});
	}
};

module.exports = {
	postCustomerDetails,
	getAllCustomers,
	getCustomerCreatedJobs,
	getCustomerPendingJobs,
	getCurrentCustomer,
	getCustomer
};
