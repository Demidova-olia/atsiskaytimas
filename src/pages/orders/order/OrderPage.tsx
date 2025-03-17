import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import styles from "./OrderPage.module.css";
import { ApiContext } from "../../../contexts/ApiContext";
import { Item, Order } from "../../../components/types";

const OrderPage: React.FC = () => {
  const { orderId } = useParams<Record<string, string>>();
  const navigate = useNavigate();

  const apiContext = useContext(ApiContext); 

  if (!apiContext) {
    throw new Error("ApiContext is not provided. Ensure ApiProvider is used correctly.");
  }

  const { orders, items, removeOrder } = apiContext;

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [itemDetails, setItemDetails] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (!orders || !orderId) {
      return;
    }

    const order = orders.find((order: Order) => order.orderId.toString() === orderId);

    if (order) {
      setSelectedOrder(order);
      const item = items.find((item: Item) => item.itemId === order.itemId);
      if (item) {
        setItemDetails(item);
      } else {
        setError("Item not found.");
        console.error("Item not found.");
      }
    } else {
      setError("Order not found.");
      console.error("Order not found.");
    }

    setLoading(false);
  }, [orders, orderId, items]);

  const handleDelete = () => {
    if (!selectedOrder) return;

    try {
      setLoading(true); 

      removeOrder(selectedOrder.orderId);

      console.log("Order deleted successfully");

      navigate("/orders");
    } catch (error) {
      setError("Error deleting order.");
      console.error("Error deleting order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!selectedOrder || !itemDetails) {
    return <p>Order or Item not found.</p>;
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

        <div className={styles.editLink}>
          <Link to={`/orders/edit/${selectedOrder.orderId}`}>Edit Order</Link>
        </div>

        <div className={styles.deleteButton}>
          <button onClick={handleDelete}>Delete Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

