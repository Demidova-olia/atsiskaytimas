import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import styles from "./OrderPage.module.css";
import { ApiContext } from "../../../contexts/ApiContext";
import { Item, Order } from "../../../components/types";

const OrderPage: React.FC = () => {
  const { orderId } = useParams<Record<string, string>>();

  const apiContext = useContext(ApiContext);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [itemDetails, setItemDetails] = useState<Item | null>(null);

  useEffect(() => {
    if (!apiContext || !orderId) {
      return;
    }

    const { orders, items } = apiContext;

    const order = orders.find((order) => order.orderId.toString() === orderId);
    if (order) {
      setSelectedOrder(order);

      const item = items.find((item) => item.itemId === order.itemId);
      if (item) {
        setItemDetails(item);
      } else {
        console.error("Item not found.");
      }
    } else {
      console.error("Order not found.");
    }
  }, [apiContext, orderId]);

  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  if (!selectedOrder || !itemDetails) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Order Details</h1>
      <div className={styles.backLink}>
        <Link to="/orders">Back to Orders</Link>
      </div>

      <div className={styles.orderDetails}>
        <h2 className={styles.orderHeader}>Order #{selectedOrder.orderId}</h2>
        <div className={styles.orderInfo}>
          <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
          <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
        </div>

        <div className={styles.itemContainer}>
          <img
            src={itemDetails.image}
            alt={itemDetails.name}
            className={styles.itemImage}
          />
          <div className={styles.itemDetails}>
            <h3>{itemDetails.name}</h3>
            <p><strong>Type:</strong> {itemDetails.type}</p>
            <p><strong>Material:</strong> {itemDetails.material}</p>
            <p><strong>Color:</strong> {itemDetails.color}</p>
            <p><strong>Price:</strong> {itemDetails.price} {itemDetails.currency}</p>
            <p><strong>Description:</strong> {itemDetails.description}</p>
          </div>
        </div>

        <div className={styles.quantityPrice}>
          <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
          <p><strong>Total Price:</strong> {selectedOrder.totalPrice} {selectedOrder.currency}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

