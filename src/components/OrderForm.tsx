import React, { useState, useContext, useEffect } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import { Order, Item } from './types';
import { API_URL } from '../../config';
import './FormStyle.css';

const OrderForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(ApiContext);

  const [customerName, setCustomerName] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState('Shipped');
  const [orderDate, setOrderDate] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    const itemFromPage = location.state?.item;
    if (itemFromPage) {
      setItemId(itemFromPage.itemId);
      setTotalPrice(itemFromPage.price);
    }
  }, [location.state?.item]);

  useEffect(() => {
    if (exchangeRates[currency]) {
      const newTotalPrice = location.state?.item?.price * exchangeRates[currency];
      setTotalPrice(newTotalPrice || 0);
    }
  }, [currency, exchangeRates, location.state?.item?.price]);

  if (!context) {
    return <p>Loading...</p>;
  }

  const { items } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: Order = {
      orderId: Date.now().toString(),
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
      const response = await axios.post(`${API_URL}/orders`, newOrder);
      console.log('Order added:', response.data);

      navigate(`/orders/${newOrder.orderId}`);

      setCustomerName('');
      setItemId('');
      setQuantity(1);
      setTotalPrice(0);
      setCurrency('USD');
      setStatus('Processing');
      setOrderDate('');
      setShippingAddress('');
    } catch (error) {
      console.error('Error adding order:', error);
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
        type="number"
        placeholder="Total Price"
        value={totalPrice}
        onChange={(e) => setTotalPrice(Number(e.target.value))}
        required
      />

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

      {location.state?.item ? (
        <>
          <p>Item to order: {location.state.item.name}</p>
          <div className="order-item-image">
            <img
              src={location.state.item.image}
              alt={location.state.item.name}
              className="item-image"
            />
          </div>
        </>
      ) : (
        <select
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
        >
          <option value="" disabled>Select Item</option>
          {items.map((item: Item) => (
            <option key={item.itemId} value={item.itemId}>
              {item.name}
              <div className="order-item-image">
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                />
              </div>
            </option>
          ))}
        </select>
      )}

      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;

