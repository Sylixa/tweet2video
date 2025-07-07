import { Rettiwt } from 'rettiwt-api';

const rettiwt = new Rettiwt();
export const getTwitterMedia = async tweetId => {
    try {
        let res = await rettiwt.tweet.details(tweetId);
        return res;
    } catch (error) {
        console.error(`Error fetching Twitter media for ID ${tweetId}:`, error);
        throw error;
    }
};
