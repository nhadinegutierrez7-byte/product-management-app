import { useState } from "react";

import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";

import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    description:
      "Comfortable wireless headphones for music and online classes.",
    specification: "Bluetooth, rechargeable battery",
    rating: 4.8,
    price: 1500,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Accessories",
    description:
      "A stylish smartwatch for everyday activities.",
    specification: "Digital display, fitness tracking",
    rating: 4.5,
    price: 2200,
    stock: 3,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    description:
      "Lightweight shoes suitable for walking and running.",
    specification: "Lightweight, comfortable sole",
    rating: 4.7,
    price: 1800,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);

  const [cart, setCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  // Add product to cart
  function addToCart(id) {
    const product = products.find((item) => item.id === id);

    if (!product || product.stock === 0) {
      alert("This product is out of stock.");
      return;
    }

    const cartItem = cart.find((item) => item.id === id);

    if (cartItem && cartItem.quantity >= product.stock) {
      alert("You have reached the available stock limit.");
      return;
    }

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === id
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { id, quantity: 1 }];
    });
  }

  // Increase quantity
  function increaseQuantity(id) {
    const product = products.find((item) => item.id === id);

    if (!product) {
      return;
    }

    const cartItem = cart.find((item) => item.id === id);

    if (!cartItem || cartItem.quantity >= product.stock) {
      alert("No more stock available.");
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Add a new product
  function addProduct(newProduct) {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
    };

    setProducts((previousProducts) => [
      ...previousProducts,
      productWithId,
    ]);
  }

  // Calculate overall total
  const overallTotal = cart.reduce((total, item) => {
    const product = products.find(
      (product) => product.id === item.id
    );

    return product
      ? total + product.price * item.quantity
      : total;
  }, 0);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🛍️ Product Management</h1>
          <p>Manage your products and shopping cart.</p>
        </div>

        <div className="cart-counter">
          🛒 Cart: {cartCount}
        </div>
      </header>

      <main className="container">
        <section className="products-section">
          <div className="section-heading">
            <div>
              <h2>Our Products</h2>
              <p>Choose your favorite products.</p>
            </div>

            <div className="filter-container">
              <label htmlFor="category-filter">
                Category:
              </label>

              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
              >
                <option value="All">All Products</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            <ProductList
              products={filteredProducts}
              cart={cart}
              onAddToCart={addToCart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onViewDetails={setSelectedProduct}
            />
          )}
        </section>

        <Cart
          cart={cart}
          products={products}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />

        <div className="summary-card">
          <h2>Order Summary</h2>

          <p>
            Total Items: <strong>{cartCount}</strong>
          </p>

          <h3>
            Total Amount: ₱
            {overallTotal.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </h3>
        </div>

        <AddProduct onAddProduct={addProduct} />

        <footer className="footer">
          <p>Product Management App | React + Vite</p>
        </footer>
      </main>

      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;