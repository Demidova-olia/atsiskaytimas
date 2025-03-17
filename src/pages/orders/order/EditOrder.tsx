import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ApiContext } from '../../../contexts/ApiContext';
import OrderForm from '../../../components/OrderForm';
import { Order } from '../../../components/types';

const EditOrder: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { orders, loading } = useContext(ApiContext) || {};

  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);

  useEffect(() => {
    if (orders && orderId) {

      const foundOrder = orders.find((order) => order.orderId === orderId);
      if (foundOrder) {
        setOrderToEdit(foundOrder);
      } else {
        console.error('Order not found');
        navigate('/orders');
      }
    }
  }, [orders, orderId, navigate]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!orderToEdit) {
    return <p>Order not found</p>;
  }

  return (
    <div>
      <h1>Edit Order</h1>
      <OrderForm existingOrder={orderToEdit} />
    </div>
  );
};

export default EditOrder;
