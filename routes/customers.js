const router = require('express').Router();

const {
	postCustomerDetails,
	getAllCustomers,
	getCustomerCreatedJobs,
	getCustomerPendingJobs,
	getCurrentCustomer,
	getCustomer
} = require('../utils/CustomerDetails');

// Register Customer Details Route
router.post('/details', async (req, res) => {
	await postCustomerDetails(req.body, res);
});

router.get('/all', async (req, res) => {
	await getAllCustomers(req.body, res);
});

router.get('/created-jobs', async (req, res) => {
	await getCustomerCreatedJobs(req, res);
});

router.get('/pending-jobs', async (req, res) => {
	await getCustomerPendingJobs(req, res);
});

router.get('/current', async (req, res) => {
	await getCurrentCustomer(req, res);
});

router.get('/find-one', async (req, res) => {
	await getCustomer(req, res);
});

module.exports = router;
