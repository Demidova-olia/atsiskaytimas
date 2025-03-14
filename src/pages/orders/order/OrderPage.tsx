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

    const order = orders.find((order) => order.order_id.toString() === orderId);
    if (order) {
      setSelectedOrder(order);

      const item = items.find((item) => item.item_id === order.item_id);
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
        <h2 className={styles.orderHeader}>Order #{selectedOrder.order_id}</h2>
        <div className={styles.orderInfo}>
          <p><strong>Customer Name:</strong> {selectedOrder.customer_name}</p>
          <p><strong>Order Date:</strong> {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Shipping Address:</strong> {selectedOrder.shipping_address}</p>
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
            <p><strong>Available Sizes:</strong> {itemDetails.sizes_available.join(", ")}</p>
            <p><strong>Description:</strong> {itemDetails.description}</p>
          </div>
        </div>

        <div className={styles.quantityPrice}>
          <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
          <p><strong>Total Price:</strong> {selectedOrder.total_price} {selectedOrder.currency}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

