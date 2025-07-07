import { AtpAgent } from '@atproto/api';
import 'dotenv/config';

const agent = new AtpAgent({
    service: 'https://bsky.social',
});

await agent.login({
    identifier: process.env.BSKY_USER,
    password: process.env.BSKY_PASS,
});

const getProfile = async actor => {
    try {
        const { data } = await agent.getProfile({
            actor: actor,
        });
        return data;
    } catch (error) {
        console.error(`Error fetching Bsky actor ${actor}:`, error);
        throw error;
    }
};

export const getPostThread = async (postId, actor) => {
    try {
        const userDID = await getProfile(actor);
        const res = await agent.getPostThread({
            uri: `at://${userDID.did}/app.bsky.feed.post/${postId}`,
        });
        const { thread } = res.data;
        return thread;
    } catch (error) {
        console.error(`Error fetching Bsky with id ${postId}/${actor}:`, error);
        throw error;
    }
};
