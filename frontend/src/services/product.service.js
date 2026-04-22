const BASE_URL = 'http://localhost:5000/api/products';

export const getProducts = async (category = '') => {
  const url = category ? `${BASE_URL}?category=${category}` : BASE_URL;
  const res  = await fetch(url);
  return res.json();
};

export const createProduct = async (data) => {
  const res = await fetch(BASE_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  return res.json();
};

export const updateProduct = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return res.json();
};