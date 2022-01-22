const router = require('express').Router();

const {
	postCustomerDetails,
	getAllCustomers,
	getCreatedJobs,
	getCurrentCustomer
} = require('../utils/CustomerDetails');

// Register Customer Details Route
router.post('/details', async (req, res) => {
	await postCustomerDetails(req.body, res);
});

router.get('/all', async (req, res) => {
	await getAllCustomers(req.body, res);
});

router.get('/created-jobs', async (req, res) => {
	await getCreatedJobs(req, res);
});

router.get('/current', async (req, res) => {
	await getCurrentCustomer(req, res);
});

module.exports = router;
