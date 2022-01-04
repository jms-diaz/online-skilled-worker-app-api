const Customer = require('../models/Customer');
const Worker = require('../models/Worker');

/**
 * @DESC Register Customer details
 */
const postCustomerDetails = async (customerDetails, res) => {
	try {
		const newCustomer = new Customer({
			...customerDetails
		});

		await newCustomer.save();
		return res.status(201).json({
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
		res.status(200).json(customers);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'No users found.',
			success: false
		});
	}
};

module.exports = {
	postCustomerDetails,
	getAllCustomers
};
