import { Router } from 'express';
import { getTwitterMedia } from '../service/getTwitterMedia.js';
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

// router.get('/',async (req,res) => {
//     res.status(400).json({
//         error: 'Could not parse tweet information from the provided input.',
//         providedInput: tweetInput,
//     });
// })

export default router;
