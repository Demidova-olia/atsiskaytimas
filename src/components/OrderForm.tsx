import React, { useState, useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Order, Item } from './types';
import { API_URL } from '../../config';

const OrderForm: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState('Shipped');
  const [orderDate, setOrderDate] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const navigate = useNavigate();

  const context = useContext(ApiContext);

  if (!context) {
    return <div>Error: ApiContext not found!</div>;
  }

  const { items } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: Order = {
      orderId: Date.now().toString(),
      customerName: customerName,
      itemId,
      quantity,
      totalPrice: totalPrice,
      currency,
      status,
      orderDate: orderDate,
      shippingAddress: shippingAddress,
    };

    try {
      const response = await axios.post(`${API_URL}/orders`, newOrder); 
      console.log('Order added:', response.data);

      navigate(`/orders/${newOrder.orderId}`);

      setCustomerName('');
      setItemId('');
      setQuantity(1);
      setTotalPrice(0);
      setCurrency('USD');
      setStatus('Shipped');
      setOrderDate('');
      setShippingAddress('');
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Order Date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Shipping Address"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Total Price"
        value={totalPrice}
        onChange={(e) => setTotalPrice(Number(e.target.value))}
        required
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        required
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
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
        <option value="" disabled>
          Select Item
        </option>
        {items.map((item: Item) => (
          <option key={item.itemId} value={item.itemId}>
            {item.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
