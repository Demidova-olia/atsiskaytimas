import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Item } from "./types";

const ItemForm = ({ editItemData }: { editItemData?: Item }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [item, setItem] = useState<Item>({
    item_id: "",
    collection_id: "",
    name: "",
    type: "",
    material: "",
    price: 0,
    currency: "USD",
    color: "",
    sizes_available: [],
    description: "",
    orders: [],
    image: "",
  });

  useEffect(() => {
    if (editItemData) {
      setItem(editItemData);
    }
  }, [editItemData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => ({
      ...prev,
      sizes_available: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!item.name || !item.collection_id) {
      setError("Item name and collection are required");
      return;
    }

    try {
      if (editItemData) {
        const { data } = await axios.put(`${API_URL}/items/${item.item_id}`, item);
        navigate(`/items/${data.item_id}`);
      } else {
        const { data } = await axios.post(`${API_URL}/items`, item);
        navigate(`/items/${data.item_id}`);
      }
    } catch (error) {
      setError("An error occurred while saving the item.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-control">
        <label htmlFor="name">Item Name:</label>
        <input type="text" name="name" id="name" value={item.name} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="type">Type:</label>
        <input type="text" name="type" id="type" value={item.type} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="material">Material:</label>
        <input type="text" name="material" id="material" value={item.material} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="price">Price:</label>
        <input type="number" name="price" id="price" value={item.price} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="color">Color:</label>
        <input type="text" name="color" id="color" value={item.color} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="sizes_available">Sizes Available (comma separated):</label>
        <input type="text" name="sizes_available" id="sizes_available" value={item.sizes_available.join(", ")} onChange={handleSizesChange} />
      </div>

      <div className="form-control">
        <label htmlFor="description">Description:</label>
        <textarea name="description" id="description" value={item.description} onChange={handleChange}></textarea>
      </div>

      <div className="form-control">
        <label htmlFor="image">Image URL:</label>
        <input type="url" name="image" id="image" value={item.image} onChange={handleChange} />
      </div>

      <button type="submit">{editItemData ? "Edit Item" : "Create Item"}</button>
    </form>
  );
};

export default ItemForm;
