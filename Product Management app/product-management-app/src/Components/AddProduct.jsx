import { useState } from "react";

function AddProduct({ onAddProduct }) {
  const [form, setForm] = useState({
    name: "",
    category: "Electronics",
    description: "",
    specification: "",
    rating: "",
    price: "",
    stock: "",
    image: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.specification.trim() ||
      !form.image.trim() ||
      form.rating === "" ||
      form.price === "" ||
      form.stock === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const rating = Number(form.rating);
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5 ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      alert(
        "Enter a valid rating (0–5), price greater than zero, and whole-number stock."
      );
      return;
    }

    onAddProduct({
      ...form,
      rating,
      price,
      stock,
    });

    setForm({
      name: "",
      category: "Electronics",
      description: "",
      specification: "",
      rating: "",
      price: "",
      stock: "",
      image: "",
    });

    alert("Product added successfully!");
  }

  return (
    <section className="form-section">
      <h2>➕ Add New Product</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <label>Product Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />

        <label>Product Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Fashion">Fashion</option>
          <option value="Home">Home</option>
        </select>

        <label>Product Image URL</label>
        <input
          name="image"
          type="url"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the product"
          required
        />

        <label>Product Specification</label>
        <input
          name="specification"
          value={form.specification}
          onChange={handleChange}
          placeholder="Example: 128GB, Wireless"
          required
        />

        <label>Rating (0–5)</label>
        <input
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          required
        />

        <label>Price (₱)</label>
        <input
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>Available Quantity</label>
        <input
          name="stock"
          type="number"
          min="0"
          step="1"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <button type="submit" className="add-button">
          Save Product
        </button>
      </form>
    </section>
  );
}

export default AddProduct;