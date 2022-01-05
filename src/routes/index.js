import express from 'express';
const router = express.Router();
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { register, signIn, update } from '../helpers/functions.js';


router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const signupResponse = await register(email, password);
        // console.log(req.body, signupResponse);
        if(signupResponse.success) {
            const { auth: { user: { uid, email, authDomain, createdAt, lastLoginAt } } } = signupResponse;
            return res
                    .status(StatusCodes.OK)
                    .send({
                        data: {
                            uid,
                            email,
                            authDomain,
                            createdAt,
                            lastLoginAt
                        },
                        // auth: signupResponse.auth.user
                    });
        } else {
            return res
            .status(StatusCodes.NOT_ACCEPTABLE)
        .send({
            error: signupResponse.message
        }); 
        }
    } catch(e) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            error: e.message
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const loginResponse = await signIn(email, password);
        // console.log(req.body, loginResponse);
        if(loginResponse.success) {
            const { uid, email, authDomain, createdAt, lastLoginAt } = loginResponse.auth.user;
            return res
                    .status(StatusCodes.OK)
                    .send({
                        data: {
                            uid,
                            email,
                            authDomain,
                            createdAt,
                            lastLoginAt
                        },
                        // auth: loginResponse.auth.user
                    });
        } else {
            return res
                    .status(StatusCodes.NOT_ACCEPTABLE)
                    .send({
                        error: loginResponse.message
                    }); 
        }
    } catch(e) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            error: e.message
        });
    }
});

router.patch('/update', async (req, res) => {
    const { password } = req.body;

    try {
        const updateResponse = await update(password);
        console.log(req.body, updateResponse);
        if(updateResponse && updateResponse.success) {
            return res
                    .status(StatusCodes.OK)
                    .send({
                        message: updateResponse.message
                    });
        } else {
            return res
                    .status(StatusCodes.NOT_ACCEPTABLE)
                    .send({
                        error: updateResponse.message
                    }); 
        }
    } catch(e) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            error: e.message
        });
    }
});

export default router;