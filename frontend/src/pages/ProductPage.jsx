import { useState, useEffect, useCallback } from 'react';
import ProductTable from '../components/ProductTable';
import ProductForm  from '../components/ProductForm';
import * as api     from '../services/product.service';

export default function ProductPage() {
  const [products,     setProducts]     = useState([]);
  const [filterCat,    setFilterCat]    = useState('');
  const [modalOpen,    setModalOpen]    = useState(false);
  const [editTarget,   setEditTarget]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [toast,        setToast]        = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const res = await api.getProducts(filterCat);
    if (res.success) setProducts(res.data);
    setLoading(false);
  }, [filterCat]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleSubmit = async (form) => {
    const res = editTarget
      ? await api.updateProduct(editTarget.id, form)
      : await api.createProduct(form);

    if (res.success) {
      showToast(editTarget ? 'แก้ไขสำเร็จ' : 'เพิ่มสินค้าสำเร็จ');
      setModalOpen(false);
      setEditTarget(null);
      loadProducts();
    } else {
      showToast(res.message || 'เกิดข้อผิดพลาด', 'error');
    }
  };

  const handleDelete = async () => {
    const res = await api.deleteProduct(deleteTarget.id);
    if (res.success) {
      showToast('ลบสินค้าสำเร็จ');
      setDeleteTarget(null);
      loadProducts();
    } else {
      showToast(res.message || 'เกิดข้อผิดพลาด', 'error');
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>ระบบจัดการสินค้า</h1>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Filter ตามหมวดหมู่..."
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1.5px solid #cbd5e0', fontSize: 14 }}
        />
        <button
          onClick={() => { setEditTarget(null); setModalOpen(true); }}
          style={{ padding: '8px 20px', background: '#3182ce', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          + เพิ่มสินค้า
        </button>
      </div>

      {/* Table */}
      {loading
        ? <p style={{ textAlign: 'center', color: '#a0aec0' }}>กำลังโหลด...</p>
        : <ProductTable
            products={products}
            onEdit={(p) => { setEditTarget(p); setModalOpen(true); }}
            onDelete={(p) => setDeleteTarget(p)}
          />
      }

      {/* Modal Form */}
      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 32, width: 420, maxWidth: '95vw' }}>
            <h2 style={{ marginBottom: 20, fontWeight: 700 }}>
              {editTarget ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
            </h2>
            <ProductForm
              initial={editTarget}
              onSubmit={handleSubmit}
              onCancel={() => { setModalOpen(false); setEditTarget(null); }}
            />
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      {deleteTarget && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 32, width: 360, textAlign: 'center' }}>
            <p style={{ marginBottom: 20, fontSize: 16 }}>
              ยืนยันการลบ <strong>{deleteTarget.name}</strong> ?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setDeleteTarget(null)}
                style={{ padding: '8px 24px', borderRadius: 6, border: '1px solid #cbd5e0', cursor: 'pointer' }}>
                ยกเลิก
              </button>
              <button onClick={handleDelete}
                style={{ padding: '8px 24px', borderRadius: 6, background: '#e53e3e', color: '#fff', border: 'none', cursor: 'pointer' }}>
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24,
          background: toast.type === 'error' ? '#e53e3e' : '#38a169',
          color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 600, zIndex: 200,
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}