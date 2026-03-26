const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

const formatUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        onboardingCompleted: true, // Mocking onboarding state for demo
    };
};

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, organizationName, email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: { message: 'User already exists' }});
        }

        const name = `${firstName} ${lastName}`.trim();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            company: organizationName,
            password: hashedPassword
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                user: formatUser(user),
                tokens: { accessToken: token }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message }});
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, error: { message: 'Invalid credentials' }});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: { message: 'Invalid credentials' }});
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            data: {
                user: formatUser(user),
                tokens: { accessToken: token }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message }});
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        // Simplified auth check since we don't have middleware mapped yet
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED' }});
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED' }});
        }

        res.status(200).json({ success: true, data: formatUser(user) });
    } catch (error) {
        res.status(401).json({ success: false, error: { code: 'TOKEN_EXPIRED' }});
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        // Decode JWT payload locally for demo usage (or verify with Google client)
        const payload = jwt.decode(credential);
        
        if (!payload || !payload.email) {
            return res.status(400).json({ success: false, error: { message: 'Invalid Google Token' } });
        }

        let user = await User.findOne({ email: payload.email });
        if (!user) {
            // Auto Register
            user = await User.create({
                name: payload.name,
                email: payload.email,
                company: 'Google Login',
                password: await bcrypt.hash(Date.now().toString(), 10)
            });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            data: {
                user: formatUser(user),
                tokens: { accessToken: token }
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, error: { message: 'Google login failed' } });
    }
};
