const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET } = require('../config');
const passport = require('passport');

/**
 * @DESC To register the user (EMPLOYER, WORKER)
 */
const userRegister = async (userDetails, role, res) => {
	try {
		// Validate the email
		let emailNotRegistered = await validateEmail(userDetails.values.email);
		if (!emailNotRegistered) {
			return res.status(400).json({
				message: `Email is already registered.`,
				success: false
			});
		}
		// Get the hashed password
		const password = await bcrypt.hash(userDetails.values.password, 12);

		// Create a new user
		const newUser = new User({
			...userDetails.values,
			password,
			role
		});

		const user_id = newUser._id.valueOf();

		await newUser.save();

		return res.status(201).json({
			message: 'User successfully registered.',
			user_id,
			success: true
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Unable to create account.',
			success: false
		});
	}
};

/**
 * @DESC To login the user (EMPLOYER, WORKER)
 */
const userLogin = async (userCreds, role, res) => {
	let { email, password } = userCreds.values;

	// Check if email exists in the DB
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({
			message: 'Username not found. Invalid login credentials.',
			success: false
		});
	}

	// Admin pass: oswlPass996
	// Check user role
	if (user.role !== role) {
		return res.status(401).json({
			message: 'Invalid login credentials. Please login at the correct portal.',
			success: false
		});
	}

	// Check if password is correct
	let isMatch = await bcrypt.compare(password, user.password);
	if (isMatch) {
		// Sign in the token and issue it to user
		let token = jwt.sign(
			{
				user_id: user._id,
				role: user.role,
				email: user.email
			},
			SECRET,
			{ expiresIn: '7 days' }
		);
		let result = {
			id: user._id,
			email: user.email,
			role: user.role,
			token: `Bearer ${token}`,
			expiresIn: 168
		};

		return res.status(200).json({
			...result,
			message: 'Login successful',
			success: true
		});
	} else {
		return res.status(401).json({
			message: 'Password is incorrect. Invalid login credentials.',
			success: false
		});
	}
};

/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate('jwt', { session: false });

/**
 * @DESC Check role middleware
 */
const checkRole = (roles) => (req, res, next) =>
	!roles.includes(req.user.role) ? res.status(401).json('Unauthorized access') : next();

const serializeUser = (user) => {
	return {
		email: user.email,
		role: user.role,
		_id: user._id
	};
};

const validateEmail = async (email) => {
	let user = await User.findOne({ email });
	return user ? false : true;
};

module.exports = {
	userRegister,
	userLogin,
	userAuth,
	serializeUser,
	checkRole
};
