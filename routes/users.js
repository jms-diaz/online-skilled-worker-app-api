const router = require('express').Router();

// Bring in User Registration function
const { userRegister, userLogin, userAuth, serializeUser, checkRole } = require('../utils/Auth');

// Workers Registration Route
router.post('/register-worker', async (req, res) => {
	await userRegister(req.body, 'worker', res);
});

// Customer Registration Route
router.post('/register-customer', async (req, res) => {
	await userRegister(req.body, 'customer', res);
});

// Workers Login Route
router.post('/login-worker', async (req, res) => {
	await userLogin(req.body, 'worker', res);
});

// Customer Login Route
router.post('/login-customer', async (req, res) => {
	await userLogin(req.body, 'customer', res);
});

// Customer Login Route
router.post('/login-admin', async (req, res) => {
	await userLogin(req.body, 'admin', res);
});

// Profile Route
router.get('/profile', userAuth, async (req, res) => {
	return res.json(serializeUser(req.user));
});

module.exports = router;
