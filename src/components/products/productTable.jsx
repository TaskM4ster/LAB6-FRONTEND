import { Pencil, Trash2, PackageOpen } from "lucide-react";

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <section className="product-card">
      <div className="product-card-title">
        <PackageOpen size={20} />
        <h2>Product Inventory</h2>
      </div>

      {products.length === 0 ? (
        <div className="empty-products">No products found.</div>
      ) : (
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>

                  <td>
                    <strong>{product.product_name}</strong>
                  </td>

                  <td>{product.description}</td>

                  <td className="price-text">
                    ₱{Number(product.price).toFixed(2)}
                  </td>

                  <td>{product.quantity}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => onEdit(product)}
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => onDelete(product.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ProductTable;
