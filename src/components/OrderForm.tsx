import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Order } from "./types";

const OrderForm = ({ editOrderData }: { editOrderData?: Order }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [order, setOrder] = useState<Order>({
    order_id: "",
    customer_name: "",
    item_id: "",
    quantity: 0,
    total_price: 0,
    currency: "USD",
    status: "In Progress",
    order_date: new Date().toISOString(),
    shipping_address: "",
  });

  useEffect(() => {
    if (editOrderData) {
      setOrder(editOrderData);
    }
  }, [editOrderData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!order.customer_name || !order.item_id) {
      setError("Customer name and item are required");
      return;
    }

    try {
      if (editOrderData) {
        const { data } = await axios.put(`${API_URL}/orders/${order.order_id}`, order);
        navigate(`/orders/${data.order_id}`);
      } else {
        const { data } = await axios.post(`${API_URL}/orders`, order);
        navigate(`/orders/${data.order_id}`);
      }
    } catch (error) {
      setError("An error occurred while saving the order.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-control">
        <label htmlFor="customer_name">Customer Name:</label>
        <input type="text" name="customer_name" id="customer_name" value={order.customer_name} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="item_id">Item ID:</label>
        <input type="text" name="item_id" id="item_id" value={order.item_id} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" name="quantity" id="quantity" value={order.quantity} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="total_price">Total Price:</label>
        <input type="number" name="total_price" id="total_price" value={order.total_price} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="shipping_address">Shipping Address:</label>
        <input type="text" name="shipping_address" id="shipping_address" value={order.shipping_address} onChange={handleChange} />
      </div>

      <button type="submit">{editOrderData ? "Edit Order" : "Create Order"}</button>
    </form>
  );
};

export default OrderForm;
