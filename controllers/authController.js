const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

async function signup(req, res) {
    const { login, email } = req.body;

    try {
        const existingUser = await userModel.findUserByLoginOrEmail(login, email);

        if (existingUser) {
            return res.status(400).send({ error: 'Login or Email already exists' });
        }

        await userModel.createUser(req.body);
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        if (error.code === 'ER_DUP_ENTRY') { 
            return res.status(400).send({ error: 'User with this login or email already exists' });
        }
        res.status(500).send({ error: error.message || 'Error creating user' });
    }
}

async function login(req, res) {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).send({ error: 'Login and password are required' });
    }

    try {
        const user = await userModel.findUserByLogin(login);

        if (!user) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.USRPWD);
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).send({ error: 'Server configuration error: JWT secret missing' });
        }

        if (!user.USRID) {
            return res.status(500).send({ error: 'Server configuration error: User ID missing' });
        }

        const token = jwt.sign({ id: user.USRID }, jwtSecret, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: error.message || 'Internal server error' });
    }
}

module.exports = { signup, login };
