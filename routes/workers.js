const router = require('express').Router();

const { postWorkerDetails, getAllWorkers, postWorkerExperience, getWorker } = require('../utils/WorkerDetails');

// Register Worker Details Route
router.post('/details', async (req, res) => {
	await postWorkerDetails(req.body, res);
});

router.post('/experience', async (req, res) => {
	await postWorkerExperience(req.body, res);
});

router.get('/all', async (req, res) => {
	await getAllWorkers(req.body, res);
});

router.get('/:id', async (req, res) => {
	await getWorker(req, res);
});

module.exports = router;
