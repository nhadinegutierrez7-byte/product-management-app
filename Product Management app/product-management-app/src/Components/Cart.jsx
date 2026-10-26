function Cart({ cart, products, onIncrease, onDecrease }) {
  const cartItems = cart
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
        subtotal: product.price * item.quantity,
      };
    })
    .filter(Boolean);

  const total = cartItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <section className="cart-section">
      <h2>🛒 Order Details</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty. Add some products!
        </p>
      ) : (
        <div className="cart-table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>

                  <td>
                    ₱
                    {item.price.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  <td>
                    <div className="cart-quantity">
                      <button
                        onClick={() => onDecrease(item.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        disabled={item.quantity >= item.stock}
                        onClick={() => onIncrease(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td>
                    ₱
                    {item.subtotal.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="total-box">
        <span>Overall Total</span>

        <strong>
          ₱
          {total.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </strong>
      </div>
    </section>
  );
}

export default Cart;