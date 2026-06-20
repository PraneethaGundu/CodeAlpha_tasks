import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/authApi";

function Cart() {
  const { cart, removeFromCart,clearCart,increaseQuantity,decreaseQuantity,} =
    useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) =>total + item.price * item.quantity,
     0
   );

  const handleCheckout = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please Login First");
      return;
    }

    try {
      const orderData = {
        userId: user.id,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: 1,
        })),
        totalPrice,
      };

      const res = await API.post(
        "/orders",
        orderData
      );

      console.log(res.data);
      clearCart();
      window.location.href = "/success";

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Order Failed"
      );
    }
  };

  return (
    <div className="cart-container">
      <h1 style={{ marginBottom: "20px" }}>
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        <>
          {cart.map((item) => (
  <div
    key={item._id}
    className="cart-item"
  >
    <h3>{item.name}</h3>

    <p
      style={{
        margin: "10px 0",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      ₹{item.price}
    </p>

    <p>
      Quantity: {item.quantity}
    </p>

    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <button
        onClick={() =>
          decreaseQuantity(item._id)
        }
      >
        -
      </button>

      <button
        onClick={() =>
          increaseQuantity(item._id)
        }
      >
        +
      </button>
    </div>

    <button
      className="btn btn-primary"
      onClick={() =>
        removeFromCart(item._id)
      }
    >
      Remove
    </button>
  </div>
    ))}


          <div className="total-box">
            Total: ₹{totalPrice}
          </div>

          <button
            className="btn btn-primary"
            style={{
              marginTop: "20px",
            }}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;