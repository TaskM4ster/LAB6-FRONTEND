import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import "../styles/layout.css";
import "../styles/products.css";

import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";

import ProductForm from "../components/products/productForm";
import ProductTable from "../components/products/productTable";
import ProductStats from "../components/products/productStats";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  logout,
} from "../services/api";

function Products({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      console.log("Products response:", data);

      setProducts(data.data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const clearForm = () => {
    setEditingId(null);
    setProductName("");
    setDescription("");
    setPrice("");
    setQuantity("");
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        product_name: productName,
        description,
        price: Number(price),
        quantity: Number(quantity),
      };

      if (editingId !== null) {
        const data = await updateProduct(editingId, productData);

        console.log("Update product response:", data);

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingId
              ? {
                  ...product,
                  ...productData,
                }
              : product,
          ),
        );

        setMessage("Product updated successfully!");
      } else {
        const data = await createProduct(productData);

        console.log("Create product response:", data);

        setProducts((currentProducts) => [...currentProducts, data.data]);

        setMessage("Product added successfully!");
      }

      clearForm();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setProductName(product.product_name);
    setDescription(product.description);
    setPrice(product.price);
    setQuantity(product.quantity);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const data = await deleteProduct(id);

      console.log("Delete product response:", data);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );

      if (editingId === id) {
        clearForm();
      }

      setMessage("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    onLogout();

    logout()
      .then((data) => {
        console.log("Logout response:", data);
      })
      .catch((error) => {
        console.error("Server logout failed:", error);
      });
  };

  return (
    <div className="app-shell">
      <Sidebar onLogout={handleLogout} />

      <main className="main-area">
        <Header />

        <div className="page-content">
          <div className="page-heading">
            <div>
              <h1>Products</h1>

              <p>Manage your available goods and inventory.</p>
            </div>

            <button
              type="button"
              className="refresh-button"
              onClick={loadProducts}
            >
              <RefreshCw size={16} />
              Refresh Products
            </button>
          </div>

          <ProductStats products={products} />

          <ProductForm
            editingId={editingId}
            productName={productName}
            setProductName={setProductName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            onSubmit={handleProductSubmit}
            onCancel={clearForm}
          />

          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {message && <p className="product-message">{message}</p>}
        </div>
      </main>
    </div>
  );
}

export default Products;
