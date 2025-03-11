import React, { useContext } from "react";
import { Link } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Order } from "../../components/types";

const OrdersPage: React.FC = () => {
  const apiContext = useContext(ApiContext);

  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  const { orders = [], loading, error } = apiContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Orders:</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order: Order) => (
            <li key={order.order_id}>
              <Link to={`/orders/${order.order_id}`} style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "black" }}>
                <img
                  src='../../public/IMG_9793.jpeg'
                  alt={`Order ${order.order_id}`}
                  style={{ width: "100px", height: "100px", marginRight: "10px", borderRadius: "8px" }}
                />
                <div>
                  <strong>Order #{order.order_id}</strong> - {order.customer_name} ({order.status})
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
