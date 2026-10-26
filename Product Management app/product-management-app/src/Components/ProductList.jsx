function ProductList({
  products,
  cart,
  onAddToCart,
  onIncrease,
  onDecrease,
  onViewDetails,
}) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const cartItem = cart.find(
          (item) => item.id === product.id
        );

        const quantity = cartItem ? cartItem.quantity : 0;
        const subtotal = product.price * quantity;

        return (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              {product.stock < 5 && (
                <span className="stock-warning">
                  Low Stock
                </span>
              )}
            </div>

            <div className="product-info">
              <span className="category-badge">
                {product.category}
              </span>

              <h3>{product.name}</h3>

              <p className="product-rating">
                ⭐ {product.rating}/5
              </p>

              <p className="product-description">
                {product.description}
              </p>

              <h3 className="product-price">
                ₱{product.price.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}
              </h3>

              <p className="stock-text">
                Available Stock: {product.stock}
              </p>

              <button
                className="details-button"
                onClick={() => onViewDetails(product)}
              >
                View Details
              </button>

              <button
                className="add-button"
                disabled={product.stock === 0}
                onClick={() => onAddToCart(product.id)}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

              <div className="quantity-control">
                <button
                  disabled={quantity === 0}
                  onClick={() => onDecrease(product.id)}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  disabled={quantity >= product.stock}
                  onClick={() => onIncrease(product.id)}
                >
                  +
                </button>
              </div>

              <p className="subtotal">
                Subtotal: ₱
                {subtotal.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;