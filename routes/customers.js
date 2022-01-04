const router = require('express').Router();

const { postCustomerDetails, getAllCustomers } = require('../utils/CustomerDetails');

// Register Customer Details Route
router.post('/details', async (req, res) => {
	await postCustomerDetails(req.body, res);
});

router.get('/all', async (req, res) => {
	await getAllCustomers(req.body, res);
});

module.exports = router;
