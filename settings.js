const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key_XD';
const TOKEN_TIME_EXPIRATION = '1d';

module.exports = {
    JWT_SECRET,
    TOKEN_TIME_EXPIRATION
}