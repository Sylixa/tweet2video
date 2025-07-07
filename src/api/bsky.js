import { Router } from 'express';
import { getPostThread } from '../service/getBskyMedia.js';
const router = Router();

router.use((req, res, next) => {
    console.log('Bsky router middleware executed for:', req.originalUrl);
    next();
});

router.get('/:actor/:id', async (req, res) => {
    const BskyId = req.params.id;
    const BskyActor = req.params.actor;

    try {
        const BskyData = await getPostThread(BskyId, BskyActor);
        console.log('BSKY: ', BskyData);
        return res.json({
            details: 'Bsky data retrieved!',
            data: BskyData,
        });
    } catch (error) {
        console.error('Error fetching Bsky media:', error);
    }

    return res.status(500).json({
        error: `Failed to retrieve Bsky media.`,
        providedInput: BskyId,
    });
});

export default router;
