const router = require('express').Router();

const {
	postWorkerDetails,
	getAllWorkers,
	verifyWorker,
	getTakenJobs,
	getCurrentWorker,
	applyJobWorker,
	searchWorkers
} = require('../utils/WorkerDetails');

// Register Worker Details Route
router.post('/details', async (req, res) => {
	await postWorkerDetails(req.body, res);
});

router.get('/all', async (req, res) => {
	await getAllWorkers(req.body, res);
});

router.get('/verify', async (req, res) => {
	await verifyWorker(req, res);
});

router.get('/taken-jobs', async (req, res) => {
	await getTakenJobs(req, res);
});

router.get('/current', async (req, res) => {
	await getCurrentWorker(req, res);
});

router.get('/apply-job', async (req, res) => {
	await applyJobWorker(req, res);
});

router.get('/search', async (req, res) => {
	await searchWorkers(req, res);
});

module.exports = router;
