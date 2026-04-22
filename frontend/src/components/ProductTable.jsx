const STOCK_STATUS = (stock) => {
  if (stock === 0)  return { label: 'หมด',       color: '#e53e3e' };
  if (stock <= 10)  return { label: 'ใกล้หมด',   color: '#d69e2e' };
  return               { label: 'พร้อมขาย',      color: '#38a169' };
};

export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p style={{ textAlign: 'center', color: '#a0aec0', padding: 40 }}>ไม่พบข้อมูลสินค้า</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr style={{ background: '#edf2f7' }}>
          {['รหัส', 'ชื่อสินค้า', 'หมวดหมู่', 'ราคา', 'สต๊อก', 'สถานะ', 'จัดการ'].map(h => (
            <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map((p, i) => {
          const status = STOCK_STATUS(p.stock);
          return (
            <tr key={p.id} style={{ background: i % 2 === 0 ? '#fff' : '#f7fafc', borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 12px' }}>{p.code}</td>
              <td style={{ padding: '10px 12px' }}>{p.name}</td>
              <td style={{ padding: '10px 12px' }}>{p.category}</td>
              <td style={{ padding: '10px 12px' }}>฿{Number(p.price).toLocaleString()}</td>
              <td style={{ padding: '10px 12px' }}>{p.stock}</td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  background: status.color, color: '#fff',
                  padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                }}>
                  {status.label}
                </span>
              </td>
              <td style={{ padding: '10px 12px' }}>
                <button onClick={() => onEdit(p)}
                  style={{ marginRight: 8, padding: '4px 12px', borderRadius: 5, border: '1px solid #3182ce', color: '#3182ce', cursor: 'pointer', background: '#fff' }}>
                  แก้ไข
                </button>
                <button onClick={() => onDelete(p)}
                  style={{ padding: '4px 12px', borderRadius: 5, border: '1px solid #e53e3e', color: '#e53e3e', cursor: 'pointer', background: '#fff' }}>
                  ลบ
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}