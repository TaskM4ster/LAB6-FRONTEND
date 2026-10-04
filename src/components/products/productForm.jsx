import { PackagePlus } from "lucide-react";

function ProductForm({
  editingId,
  productName,
  setProductName,
  description,
  setDescription,
  price,
  setPrice,
  quantity,
  setQuantity,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="product-card">
      <div className="product-card-title">
        <PackagePlus size={20} />

        <h2>{editingId !== null ? "Edit Product" : "Add Product"}</h2>
      </div>

      <form className="product-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>

          <input
            type="number"
            min="0"
            placeholder="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          {editingId !== null && (
            <button
              type="button"
              className="secondary-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

          <button type="submit" className="primary-button">
            {editingId !== null ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
