import mongoose, { Types } from 'mongoose'
 
const schema = new mongoose.Schema({ 
	user_id: { type: String, required: true },
    // Level: 
    // 0 - clean
    // 1 - warn
    // 2 - danger
    level: { type: Number, required: true }
});
export const users = mongoose.model('user', schema);