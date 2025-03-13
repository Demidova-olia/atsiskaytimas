import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Order, Item } from "./types";

const OrderForm = ({ editOrderData }: { editOrderData?: Order }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]); // Массив товаров
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
    // Загрузка списка товаров из API
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/items`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();

    if (editOrderData) {
      setOrder(editOrderData);
    }
  }, [editOrderData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const quantity = parseInt(value);
    setOrder((prev) => {
      const total_price = calculateTotalPrice(prev.item_id, quantity);
      return {
        ...prev,
        quantity,
        total_price,
      };
    });
  };

  const calculateTotalPrice = (itemId: string, quantity: number): number => {
    const item = items.find(item => item.item_id === itemId);
    if (!item) return 0;
    return item.price * quantity;
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
        <input
          type="text"
          name="customer_name"
          id="customer_name"
          value={order.customer_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="item_id">Item:</label>
        <select
          name="item_id"
          id="item_id"
          value={order.item_id}
          onChange={(e) => {
            handleChange(e);
            // Когда меняется товар, пересчитываем цену
            const total_price = calculateTotalPrice(e.target.value, order.quantity);
            setOrder((prev) => ({
              ...prev,
              item_id: e.target.value,
              total_price,
            }));
          }}
        >
          <option value="">Select an item</option>
          {items.map((item) => (
            <option key={item.item_id} value={item.item_id}>
              {item.name} - ${item.price}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={order.quantity}
          onChange={handleQuantityChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="total_price">Total Price:</label>
        <input
          type="number"
          name="total_price"
          id="total_price"
          value={order.total_price}
          disabled
        />
      </div>

      <div className="form-control">
        <label htmlFor="shipping_address">Shipping Address:</label>
        <input
          type="text"
          name="shipping_address"
          id="shipping_address"
          value={order.shipping_address}
          onChange={handleChange}
        />
      </div>

      <button type="submit">{editOrderData ? "Edit Order" : "Create Order"}</button>
    </form>
  );
};

export default OrderForm;

