import * as repo from '../repositories/product.repository.js';

export const getAllProducts = async (category) => {
  return await repo.findAll(category);
};

export const getProductById = async (id) => {
  const product = await repo.findById(id);
  if (!product) throw { status: 404, message: 'Product not found' };
  return product;
};

export const createProduct = async (data) => {
  const existing = await repo.findByCode(data.code);
  if (existing) throw { status: 409, message: 'Product code already exists' };
  return await repo.create(data);
};

export const updateProduct = async (id, data) => {
  const product = await repo.findById(id);
  if (!product) throw { status: 404, message: 'Product not found' };
  return await repo.update(id, data);
};

export const deleteProduct = async (id) => {
  const product = await repo.remove(id);
  if (!product) throw { status: 404, message: 'Product not found' };
  return product;
};