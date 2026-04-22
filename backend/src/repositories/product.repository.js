import pool from '../config/db.js';

export const findAll = async (category = null) => {
  let query    = 'SELECT * FROM products';
  const params = [];

  if (category) {
    query += ' WHERE category = $1';
    params.push(category);
  }

  query += ' ORDER BY created_at DESC';
  const result = await pool.query(query, params);
  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1', [id]
  );
  return result.rows[0] || null;
};

export const findByCode = async (code) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE code = $1', [code]
  );
  return result.rows[0] || null;
};

export const create = async (data) => {
  const { code, name, category, price, stock } = data;
  const result = await pool.query(
    `INSERT INTO products (code, name, category, price, stock)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [code, name, category, price, stock]
  );
  return result.rows[0];
};

export const update = async (id, data) => {
  const { name, category, price, stock } = data;
  const result = await pool.query(
    `UPDATE products
     SET name=$1, category=$2, price=$3, stock=$4
     WHERE id=$5 RETURNING *`,
    [name, category, price, stock, id]
  );
  return result.rows[0] || null;
};

export const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM products WHERE id=$1 RETURNING *', [id]
  );
  return result.rows[0] || null;
};