const { Router } = require('express');
const { signUp, login } = require('../controllers/auth.controller');
const { verifyExistingUser } = require('../middlewares/verifyExistingData');

const authRoutes = Router();

authRoutes.post('/signup', verifyExistingUser, signUp);
authRoutes.post('/login', login);

exports.authRoutes = authRoutes;
