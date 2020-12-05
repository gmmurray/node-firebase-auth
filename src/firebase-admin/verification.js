const admin = require('./admin');

async function verifyAdminToken(req, res, next) {
    const idToken = req.headers.authorization;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        if (decodedToken) {
            req.body.uid = decodedToken.uid;

            return next();
        } else {
            return res.status(401).send('You are not authorized');
        }
    } catch (e) {
        return res.status(401).send('You are not authorized');
    }
}

module.exports = verifyAdminToken;
