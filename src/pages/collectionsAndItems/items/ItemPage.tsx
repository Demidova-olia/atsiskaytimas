import React, { useContext } from "react";
import { useParams } from "react-router";
import { ApiContext } from "../../../contexts/ApiContext";

const ItemPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const apiContext = useContext(ApiContext);

  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  const { items = [], loading, error } = apiContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const item = items.find(item => item.itemId === String(itemId));

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} style={{ width: "300px", height: "300px", objectFit: "cover" }} />
      <p>{item.description}</p>
    </div>
  );
};

export default ItemPage;
