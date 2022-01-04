const { createJob } = require('../utils/JobListing');

const router = require('express').Router();

router.post('/create-job', async (req, res) => {
	await createJob(req.body, res);
});
