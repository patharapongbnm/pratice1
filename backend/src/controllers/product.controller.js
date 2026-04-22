import * as service from '../services/product.service.js';

export const getAll = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await service.getAllProducts(category);
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await service.getProductById(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const product = await service.updateProduct(req.params.id, req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await service.deleteProduct(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};