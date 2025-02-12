import Product from '../models/Product.js';
// Get all products
export async function getProducts(req, res){

    try {
        const products = await Product.find().sort({ _id: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Create a new product
export async function createProduct(req, res){
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
