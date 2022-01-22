const {
	createJob,
	getJobs,
	markJobAsComplete,
	getPendingJobs,
	searchJobs,
	markJobAsPaid,
	hireWorker,
	applyWorker
} = require('../utils/JobListing');

const router = require('express').Router();

router.post('/create-job', async (req, res) => {
	await createJob(req.body, res);
});

router.put('/hire', async (req, res) => {
	await hireWorker(req.body, res);
});

router.put('/apply', async (req, res) => {
	await applyWorker(req.body, res);
});

router.get('/all', async (req, res) => {
	await getJobs(req.body, res);
});

router.get('/pending', async (req, res) => {
	await getPendingJobs(req.body, res);
});

router.put('/mark-as-complete', async (req, res) => {
	await markJobAsComplete(req.body, res);
});

router.put('/mark-as-paid', async (req, res) => {
	await markJobAsPaid(req.body, res);
});

router.get('/search', async (req, res) => {
	await searchJobs(req, res);
});

module.exports = router;
