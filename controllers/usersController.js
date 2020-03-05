const { User } = require('../sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET, TOKEN_TIME_EXPIRATION } = require('../settings');

const hashPassword = async password => await bcrypt.hash(password, 10);

const validatePassword = async (plain, hashed) => await bcrypt.compare(plain, hashed);

const signup = async (req, res, next) => {
    try {
        const { email, password, role, nick } = req.body;
        const hashedPassword = await hashPassword(password);
        const data = {
            email,
            password: hashedPassword,
            role: role || 'basic',
            nick
        }
        const newUser = await User.create(data);
        const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
            expiresIn: TOKEN_TIME_EXPIRATION
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            accessToken
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            error: 'Something went worng'
        });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ 
            where: {
                email
            } 
        });
        if (!user) {
            return next(new Error('Email address does not exist'));
        }
        const isValidPassword = validatePassword(password, user.password);
        if (!isValidPassword) {
            return next(new Error('Email address does not exist'));
        }
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: TOKEN_TIME_EXPIRATION
        });
        await user.update({ accessToken }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({
            data: {
                email: user.email,
                role: user.role
            },
            accessToken
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            error: 'Something went worng'
        });
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).send({
            data: users
        })
    } catch(error) {
        res.status(500).json({
            error: 'Something went worng'
        });
    }
}

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.find({ where: {
            id: userId
        }});
        if (!user) {
            return next(new Error('User does not exist'));
        }
        res.status(200).json({
            data: user
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went worng'
        });
    }
}


module.exports = {
    signup,
    login,
    getUsers,
    getUser
}