const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, organizationName } = req.body;
        const name = `${firstName} ${lastName}`;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: { message: 'User already exists' } });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            company: organizationName,
            companyName: organizationName,
        });

        res.status(201).json({
            success: true,
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                tokens: { accessToken: generateToken(user._id) }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.password) {
            return res.status(401).json({ success: false, error: { message: 'Invalid email or password' } });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: { message: 'Invalid email or password' } });
        }

        res.status(200).json({
            success: true,
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                tokens: { accessToken: generateToken(user._id) }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            const randomPassword = await bcrypt.hash(Date.now().toString(), 10);
            user = await User.create({
                name,
                email,
                password: randomPassword
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                tokens: { accessToken: generateToken(user._id) }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

exports.getMe = async (req, res) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, error: { message: 'Not authorized' } });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, error: { message: 'User not found' } });
        }

        res.status(200).json({
            success: true,
            data: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(401).json({ success: false, error: { message: 'Token is invalid or expired' } });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ success: true, data: {} });
};
