const { sign } = require('jsonwebtoken');
const { config } = require('../config');

exports.generateAuthToken = (user) => {
    const token = sign(
        {
            _id: user._id,
            username: user.username,
        },
        config.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    )
    return token;
}
