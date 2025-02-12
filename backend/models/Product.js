import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    images: [String],
    category: String,
});
export default mongoose.model('Product', ProductSchema);

