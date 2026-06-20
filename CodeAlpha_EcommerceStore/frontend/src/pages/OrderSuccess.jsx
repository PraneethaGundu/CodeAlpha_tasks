import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
      }}
    >
      <h1
        style={{
          color: "green",
          fontSize: "40px",
        }}
      >
        🎉 Order Placed Successfully!
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginTop: "20px",
        }}
      >
        Thank you for shopping with ShopEase.
      </p>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Link to="/">
          <button className="btn btn-primary">
            Continue Shopping
          </button>
        </Link>

        <Link to="/orders">
          <button className="btn btn-primary">
            View Orders
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;