import { useEffect, useState } from "react";
import API from "../api/authApi";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        `/orders/${user.id}`
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="cart-item"
          >
            <h3>
              Order ID: {order._id}
            </h3>

            <p
  style={{
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    backgroundColor:
      order.status === "Delivered"
        ? "#22c55e"
        : order.status === "Shipped"
        ? "#3b82f6"
        : order.status === "Processing"
        ? "#f59e0b"
        : "#6b7280",
    color: "white",
    fontWeight: "bold",
  }}
>
  {order.status}
</p>

            <p>
              Total: ₹{order.totalPrice}
            </p>

            <h4>Items:</h4>

            {order.items.map((item, index) => (
              <div key={index}>
                {item.name} - ₹{item.price}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;