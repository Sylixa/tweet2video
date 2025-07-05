import { Rettiwt } from 'rettiwt-api';

const rettiwt = new Rettiwt();
const getTwitterMedia = async tweetId => {
    try {
        let res = await rettiwt.tweet.details(tweetId);
        return res;
    } catch (error) {
        return error;
    }
};

export { getTwitterMedia };
