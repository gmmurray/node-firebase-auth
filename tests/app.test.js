import '@babel/polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import rp from 'request-promise';
import dotenv from 'dotenv';

import app from '../src/app';
import admin from '../src/firebase-admin/admin';

dotenv.config();
chai.use(chaiHttp);

const uid = 'test-user-id';

let customToken = null;
let idToken = null;

describe('The app', () => {
    before(async () => {
        try {
            customToken = await admin.auth().createCustomToken(uid);

            const res = await rp({
                url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`,
                method: 'POST',
                body: {
                    token: customToken,
                    returnSecureToken: true,
                },
                json: true,
            });
            idToken = res.idToken;
        } catch (error) {
            console.log(error);
        }
    });

    it('Displays a welcome message', done => {
        chai.request(app)
            .get('/admin')
            .set('Authorization', idToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.text).to.be.a('string');
                done();
            });
    });
});
