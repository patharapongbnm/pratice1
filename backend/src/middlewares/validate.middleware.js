export const validateProduct = (req, res, next) => {
  const { code, name, category, price, stock } = req.body;
  const errors = [];

  if (!code?.trim())     errors.push('code is required');
  if (!name?.trim())     errors.push('name is required');
  if (!category?.trim()) errors.push('category is required');
  if (price == null)     errors.push('price is required');
  if (stock == null)     errors.push('stock is required');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  if (!/^[a-zA-Z0-9]+$/.test(code))                    errors.push('code must be alphanumeric only');
  if (name.trim().length < 3 || name.trim().length > 100) errors.push('name must be between 3 and 100 characters');
  if (isNaN(price) || Number(price) <= 0)               errors.push('price must be greater than 0');
  if (!Number.isInteger(Number(stock)) || Number(stock) < 0) errors.push('stock must be a non-negative integer');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};