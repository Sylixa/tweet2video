import { Router } from 'express';
import { getTwitterMedia } from '../service/getTwitterMedia.js';

const route = Router();

const extractTweetInfo = tweetInput => {
    let username = null;
    let tweetId = null;
    let source = 'unknown';

    const url = new URL(tweetInput);

    if (
        url.hostname === 'x.com' ||
        url.hostname === 'www.x.com' ||
        url.hostname === 'twitter.com' ||
        url.hostname === 'www.twitter.com'
    ) {
        //'/username/status/tweetId'
        const pathnameRegex = /^\/([a-zA-Z0-9_]+)\/status\/(\d+)$/;
        const pathnameMatch = url.pathname.match(pathnameRegex);

        if (pathnameMatch && pathnameMatch.length === 3) {
            username = pathnameMatch[1];
            tweetId = pathnameMatch[2];
            source = 'full_url_parsed';

            return { username, tweetId, source };
        }
    }

    const idRegex = /^\d+$/;
    const idMatch = tweetInput.match(idRegex);

    if (idMatch) {
        tweetId = tweetInput;
        source = 'raw_tweet_id';

        return { username, tweetId, source };
    }
    return { username, tweetId, source };
};

route.get('/tweet', async (req, res) => {
    const tweetInput = req.query.q;

    let validTweet = true;

    if (!tweetInput) {
        console.log('failed');
        validTweet = false;
        return res.status(400).json({
            error: 'Missing "q" query parameter. Please provide a full Twitter URL or a tweet ID.',
            example1: '/api/tweet?q=https://twitter.com/username/status/12345',
            example2: '/api/tweet?q=1234567890',
        });
    }

    let { username, tweetId, source } = extractTweetInfo(tweetInput);

    if (!username || !tweetId || source === 'unknown') {
        validTweet = false;
        console.error('Input is not a valid URL');
    }

    if (validTweet === true) {
        try {
            const tweetMediaData = await getTwitterMedia(tweetId);
            return res.json({
                details: 'Tweet media data retrieved!',
                data: tweetMediaData,
            });
        } catch (error) {
            console.error('Error fetching tweet media:', error);
            return res.status(500).json({
                error: 'Failed to retrieve tweet media.',
                details: error.message,
            });
        }
    }

    res.status(400).json({
        error: 'Could not parse tweet information from the provided input.',
        providedInput: tweetInput,
    });
});

export default route;
