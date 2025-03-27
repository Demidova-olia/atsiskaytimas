import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../../contexts/ApiContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Order, Item } from '../types';
import { API_URL } from '../../../config';
import './FormStyle.css';

interface OrderFormProps {
  existingOrder?: Order;
}

const OrderForm: React.FC<OrderFormProps> = ({ existingOrder }) => {
  const navigate = useNavigate();
  const context = useContext(ApiContext);

  const [customerName, setCustomerName] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState('Processing');
  const [orderDate, setOrderDate] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [itemPrice, setItemPrice] = useState(0);

  useEffect(() => {
    if (existingOrder) {
      setCustomerName(existingOrder.customerName);
      setItemId(existingOrder.itemId);
      setQuantity(existingOrder.quantity);
      setTotalPrice(existingOrder.totalPrice);
      setCurrency(existingOrder.currency);
      setStatus(existingOrder.status);
      setOrderDate(existingOrder.orderDate);
      setShippingAddress(existingOrder.shippingAddress);
      const item = context?.items.find(item => item.itemId === existingOrder.itemId);
      if (item) setItemPrice(item.price);
    }
  }, [existingOrder, context]);

  if (!context) {
    return <p>Loading...</p>;
  }

  const { items } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedOrder: Order = {
      orderId: existingOrder ? existingOrder.orderId : Date.now().toString(),
      customerName,
      itemId,
      quantity,
      totalPrice,
      currency,
      status,
      orderDate,
      shippingAddress,
    };

    try {
      if (existingOrder) {
 
        await axios.put(`${API_URL}/orders/${existingOrder.orderId}`, updatedOrder);
        console.log('Order updated:', updatedOrder);
      } else {

        await axios.post(`${API_URL}/orders`, updatedOrder);
        console.log('Order added:', updatedOrder);
      }

      navigate(`/orders/${updatedOrder.orderId}`);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="customerName">Customer Name: </label>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />

      <label htmlFor="orderDate">Order Date: </label>
      <input
        type="date"
        placeholder="Order Date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
        required
      />

      <label htmlFor="shippingAddress">Shipping Address: </label>
      <input
        type="text"
        placeholder="Shipping Address"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        required
      />

      <label htmlFor="quantity">Quantity: </label>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />

      <label htmlFor="totalPrice">Total Price: </label>
      <input
        className="total-price"
        type="number"
        placeholder="Total Price"
        value={totalPrice.toFixed(2)} 
        onChange={(e) => setTotalPrice(Number(e.target.value))}
        required
        disabled
      />
      <p>Item Price: {itemPrice}</p>

      <label htmlFor="currency">Currency: </label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        required
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <label htmlFor="status">Status: </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="Shipped">Shipped</option>
        <option value="Processing">Processing</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <select
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
        required
      >
        <option value="" disabled>Select Item</option>
        {items.map((item: Item) => (
          <option key={item.itemId} value={item.itemId}>
            {item.name}
          </option>
        ))}
      </select>

      <button type="submit">Save Order</button>
    </form>
  );
};

export default OrderForm;
