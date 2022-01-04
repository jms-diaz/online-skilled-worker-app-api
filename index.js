const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const passport = require('passport');
const { success, error } = require('consola');
const { connect } = require('mongoose');
const multer = require('multer');
const path = require('path');

// Bring in the app constants
const { DB, PORT } = require('./config');

// Initialize the app
const app = express();

// Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());
app.use('/images', express.static(path.join(__dirname, '/images')));

require('./middlewares/passport')(passport);

// User Router Middleware
app.use('/api/users', require('./routes/users'));
app.use('/api/workers', require('./routes/workers'));
app.use('/api/customers', require('./routes/customers'));

const startApp = () => {
	try {
		// Connect to database
		connect(DB, {
			useUnifiedTopology: true,
			useNewURLParser: true
		});
		success({
			message: `Successfully connected with DB \n${DB}`,
			badge: true
		});

		// start listening to server on PORT
		app.listen(PORT, () =>
			success({
				message: `Server started on PORT ${PORT}`,
				badge: true
			})
		);
	} catch (err) {
		error({
			message: `Unable to connect to DB \n${err}`,
			badge: true
		});
	}
};

startApp();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	}
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded');
});
