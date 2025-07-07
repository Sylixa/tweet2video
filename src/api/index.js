import { Router } from 'express';
import tweetRouter from './tweet.js';
import bskyRouter from './bsky.js';

const router = Router();

router.use((req, res, next) => {
    console.log(
        `API Router hit at: ${req.originalUrl} - Method: ${req.method}`
    );
    next();
});

router.use('/tweet', tweetRouter);
router.use('/bsky', bskyRouter);

//Hit nothing, tell the client to select social route
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API root! Please select the API Route',
    });
});

export default router;
