// TODO: Fix error somewhere here

const { postWorkerExperience } = require('../utils/ExperienceDetails');

const router = require('express').Router();

router.post('/add-experience', async (req, res) => {
	await postWorkerExperience(req.body, res);
});

module.exports = router;
