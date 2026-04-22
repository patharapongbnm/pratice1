import { useState, useEffect } from 'react';

const EMPTY_FORM = { code: '', name: '', category: '', price: '', stock: '' };

// ย้าย Field ออกมาข้างนอก ProductForm
const Field = ({ label, name, value, onChange, error, type = 'text', disabled }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>{label}</label>
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(name, e.target.value)}
      style={{
        width: '100%', padding: '8px 12px', borderRadius: 6,
        border: error ? '1.5px solid #e53e3e' : '1.5px solid #cbd5e0',
        outline: 'none', fontSize: 14,
      }}
    />
    {error && <span style={{ color: '#e53e3e', fontSize: 12 }}>{error}</span>}
  </div>
);

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form,   setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial || EMPTY_FORM);
    setErrors({});
  }, [initial]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.code.trim())                               e.code     = 'กรุณากรอกรหัสสินค้า';
    else if (!/^[a-zA-Z0-9]+$/.test(form.code))         e.code     = 'รหัสต้องเป็น alphanumeric เท่านั้น';
    if (form.name.trim().length < 3)                     e.name     = 'ชื่อต้องมีอย่างน้อย 3 ตัวอักษร';
    if (!form.category.trim())                           e.category = 'กรุณากรอกหมวดหมู่';
    if (!form.price || Number(form.price) <= 0)          e.price    = 'ราคาต้องมากกว่า 0';
    if (form.stock === '' || Number(form.stock) < 0)     e.stock    = 'จำนวนต้องไม่ติดลบ';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="รหัสสินค้า *"  name="code"     value={form.code}     onChange={handleChange} error={errors.code}     disabled={!!initial} />
      <Field label="ชื่อสินค้า *"  name="name"     value={form.name}     onChange={handleChange} error={errors.name} />
      <Field label="หมวดหมู่ *"    name="category" value={form.category} onChange={handleChange} error={errors.category} />
      <Field label="ราคา *"        name="price"    value={form.price}    onChange={handleChange} error={errors.price}    type="number" />
      <Field label="จำนวนสต๊อก *"  name="stock"    value={form.stock}    onChange={handleChange} error={errors.stock}    type="number" />

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
        <button type="button" onClick={onCancel}
          style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid #cbd5e0', cursor: 'pointer' }}>
          ยกเลิก
        </button>
        <button type="submit"
          style={{ padding: '8px 20px', borderRadius: 6, background: '#3182ce', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {initial ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
        </button>
      </div>
    </form>
  );
}