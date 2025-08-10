import { Rettiwt } from 'rettiwt-api';

const rettiwt = new Rettiwt();
export const getTwitterUserTimeline = async userId => {
    try {
        let res = await rettiwt.user.timeline(userId);
        return res;
    } catch (error) {
        console.error(
            `Error fetching Twitter timeline for ID ${userId}:`,
            error
        );
        throw error;
    }
};
