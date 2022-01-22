// TODO: Fix error somewhere here

const { postWorkerEducation } = require('../utils/EducationDetails');

const router = require('express').Router();

router.post('/add-education', async (req, res) => {
	await postWorkerEducation(req.body, res);
});

module.exports = router;
