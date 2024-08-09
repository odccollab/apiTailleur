// cronJobs.js
import cron from 'node-cron';
import Post from '../models/Post.js';
import User from '../models/User.js';

// Schedule the task to run every hour
cron.schedule('0 * * * *', async () => {
    try {
        const now = new Date();
        // Delete stories where expireAt is less than the current time
        await Post.deleteMany({ expireAt: { $lte: now } });
        console.log('Expired stories deleted');
    } catch (err) {
        console.error('Error deleting expired stories:', err);
    }
});
cron.schedule('0 0 * * *', async () => {
    try {
        const tailleurUsers = await User.find({ role: 'tailleur' });

        tailleurUsers.forEach(async (user) => {
            user.credits += 1;
            await user.save();
        });

        console.log('1 credit added to all Tailleur users');
    } catch (err) {
        console.error('Error adding credits to Tailleur users:', err);
    }
});