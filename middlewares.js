const { roles } = require('./roles');
const jwt = require('jsonwebtoken');
const { User } = require('./sequelize');
const { JWT_SECRET } = require('./settings');

const grantAccess = (action, resouce) => {
    return async (req, res, next) => {
        console.log('req.user: ', req.user);
        
        try {
            const permission = roles.can(req.user.role)[action](resouce);
            if (!permission.granted) {
                return res.status(401).json({
                    error: 'You does not have enough permission to perform this action'
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

const allowIfLoggedin = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        console.log('user: ', user);
        
        
        if (!user) {
            return res.status(401).json({
                error: 'You need to be logged in to access this route'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

const verifyJWT = async (req, res, next) => {
    if (req.headers['x-access-token']) {
        const accessToken = req.headers['x-access-token'];
        const {  userId, exp } = await jwt.verify(accessToken, JWT_SECRET);
        if (exp < Date.now().valueOf / 1000) {
            return res.status(401).json({
                error: 'JWT token has expired, please login to obtain a new one'
            });
        }
        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });
            res.locals.loggedInUser = user.dataValues;
            
            next();
        } catch(error) {
            console.log('Error: ', error);
        }
    } else {
        next();
    }
}

module.exports = {
    grantAccess,
    allowIfLoggedin,
    verifyJWT
}