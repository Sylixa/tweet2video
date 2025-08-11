import { Router } from 'express';
import { getTwitterMedia } from '../service/getTwitterMedia.js';
import { getTwitterUserTimeline } from '../service/getTwitterTimeline.js';
const router = Router();

router.use((req, res, next) => {
    console.log('Tweet router middleware executed for:', req.originalUrl);
    next();
});

router.get('/:id', async (req, res) => {
    const tweetId = req.params.id;

    try {
        const tweetData = await getTwitterMedia(tweetId);
        console.log('TWEET: ', tweetData);
        if (!tweetData) {
            res.status(200).json({
                details: 'The tweet you requested seem to be restricted',
                data: null,
            });
        }
        return res.json({
            details: 'Tweet data retrieved!',
            data: tweetData,
        });
    } catch (error) {
        console.error('Error fetching tweet media:', error);
    }

    return res.status(500).json({
        error: 'Failed to retrieve tweet media.',
        providedInput: tweetId,
    });
});
router.get('/:id/timeline', async (req, res) => {
    const userId = req.params.id;
    const nextCursor = req.query.cursor || undefined;
    console.log(req);

    try {
        const userTimeline = await getTwitterUserTimeline(userId, nextCursor);
        console.log(`Request Timeline from Uid:${userId}`);

        if (!userTimeline) {
            res.status(200).json({
                details: 'The timeline you requested seem to be restricted',
                data: null,
            });
        }

        if (!userTimeline.list) {
            res.status(200).json({
                details: 'The timeline you requested seem to empty',
                data: userTimeline,
            });
        }

        return res.json({
            details: 'Tweet timeline retrieved!',
            data: userTimeline,
        });
    } catch (error) {
        console.error('Error fetching tweet timeline:', error);
    }

    return res.status(500).json({
        error: 'Failed to retrieve tweet media.',
        providedInput: tweetId,
    });
});

export default router;
