import { Package, Boxes } from "lucide-react";

function ProductStats({ products }) {
  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (total, product) => total + Number(product.quantity),
    0,
  );

  return (
    <section className="product-stats">
      <div className="stat-card">
        <div className="stat-icon">
          <Package size={24} />
        </div>

        <div>
          <p className="stat-label">Total Products</p>
          <p className="stat-value">{totalProducts}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Boxes size={24} />
        </div>

        <div>
          <p className="stat-label">Total Stock</p>
          <p className="stat-value">{totalQuantity}</p>
        </div>
      </div>
    </section>
  );
}

export default ProductStats;
