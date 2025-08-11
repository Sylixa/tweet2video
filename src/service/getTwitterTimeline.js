import { Rettiwt } from 'rettiwt-api';

const rettiwt = new Rettiwt();
export const getTwitterUserTimeline = async (userId, cursor = undefined) => {
    try {
        let res = await rettiwt.user.timeline(userId, 20, cursor);
        return res;
    } catch (error) {
        console.error(
            `Error fetching Twitter timeline for ID ${userId}:`,
            error
        );
        throw error;
    }
};
