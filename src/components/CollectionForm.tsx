import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Collection } from "./types";

const CollectionForm = ({ editCollectionData }: { editCollectionData?: Collection }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [collection, setCollection] = useState<Collection>({
    collection_id: "",
    designer_id: "",
    name: "",
    season: "",
    year: new Date().getFullYear(),
    items: [],
  });

  useEffect(() => {
    if (editCollectionData) {
      setCollection(editCollectionData);
    }
  }, [editCollectionData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCollection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemNames = e.target.value.split(",").map((itemName) => itemName.trim());

    setCollection((prev) => ({
      ...prev,
      items: itemNames.map((itemName, index) => ({
        item_id: `item-${index}-${Math.random()}`,
        collection_id: prev.collection_id,
        name: itemName,
        type: "", 
        material: "", 
        price: 0, 
        currency: "", 
        color: "", 
        sizes_available: [], 
        description: "", 
        orders: [], 
        image: "", 
      })),
    }));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!collection.name || !collection.designer_id) {
      setError("Collection name and designer are required");
      return;
    }

    try {
      if (editCollectionData) {
        const { data } = await axios.put(`${API_URL}/collections/${collection.collection_id}`, collection);
        navigate(`/collections/${data.collection_id}`);
      } else {
        const { data } = await axios.post(`${API_URL}/collections`, collection);
        navigate(`/collections/${data.collection_id}`);
      }
    } catch (error) {
      setError("An error occurred while saving the collection.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-control">
        <label htmlFor="name">Collection Name:</label>
        <input type="text" name="name" id="name" value={collection.name} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="season">Season:</label>
        <input type="text" name="season" id="season" value={collection.season} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="year">Year:</label>
        <input type="number" name="year" id="year" value={collection.year} onChange={handleChange} />
      </div>

      <div className="form-control">
        <label htmlFor="items">Items (comma separated):</label>
        <input type="text" name="items" id="items" value={collection.items.map((item) => item.name).join(", ")} onChange={handleItemsChange} />
      </div>

      <button type="submit">{editCollectionData ? "Edit Collection" : "Create Collection"}</button>
    </form>
  );
};

export default CollectionForm;
