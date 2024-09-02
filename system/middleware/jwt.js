const jwt = require('jsonwebtoken');

const generateTokens = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: 3600 }, 
            (err, token) => {
                if (err) reject(err);

                jwt.sign(
                    payload,
                    process.env.REFRESH_SECRET_KEY,
                    { expiresIn: process.env.EXPIRE_IN },
                    (err, refreshToken) => {
                        if (err) reject(err);
                        resolve({ token, refreshToken });
                    }
                );
            }
        );
    });
};

module.exports = { generateTokens };
