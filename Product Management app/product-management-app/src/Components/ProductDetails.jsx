function ProductDetails({ product, onClose }) {
  if (!product) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="modal-image"
        />

        <span className="category-badge">
          {product.category}
        </span>

        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <h3>Product Specifications</h3>

        <p>{product.specification}</p>

        <p>Rating: ⭐ {product.rating}/5</p>

        <p>
          Price: ₱
          {product.price.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </p>

        <p>Available Stock: {product.stock}</p>

        <button className="add-button" onClick={onClose}>
          Close Details
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;