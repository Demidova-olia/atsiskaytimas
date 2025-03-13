import React, { useContext } from "react";
import { Link } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Order } from "../../components/types";
import styles from './OrdersPage.module.css';

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
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Orders:</h1>
      <Link to="/orders/create" className={styles.addOrderLink}>Make a new order</Link>
      {orders.length > 0 ? (
        <ul className={styles.orderList}>
          {orders.map((order: Order) => (
            <li key={order.order_id} className={styles.orderListItem}>
              <Link to={`/orders/${order.order_id}`} style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "black" }}>
                <img
                  src='../../public/IMG_9793.jpeg'
                  alt={`Order ${order.order_id}`}
                  className={styles.orderImage}
                />
                <div className={styles.orderDetails}>
                  <div className={styles.orderId}>Order #{order.order_id}</div>
                  <div className={styles.orderCustomerName}>{order.customer_name}</div>
                  <div className={styles.orderStatus}>{order.status}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noOrdersMessage}>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;

