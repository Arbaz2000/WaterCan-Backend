const Product = require('../models/product');

exports.addProduct = async (req, res) => {
  try {
    const { productName, productDescription, productPrice } = req.body;
    if (!productName || !productDescription || !productPrice) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    console.log("hello i am called!!",req.body)
    const prod = new Product({ productName, productDescription, productPrice });
    await prod.save();
    console.log('Product Added:', prod);
    res.status(201).json({ message: 'Product added successfully', prod });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Error getting products' });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ error: 'Error getting product by ID' });
  }
};
