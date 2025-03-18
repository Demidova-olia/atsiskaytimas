import React, { useContext } from "react";
import {useParams } from "react-router"; 
import { ApiContext } from "../../../contexts/ApiContext";
import { useNavigate } from "react-router";
import NavigationBar from "../../../components/NavigationBar";

const ItemPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const apiContext = useContext(ApiContext);
  const navigate = useNavigate();

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

  const handleOrderCreation = () => {
    navigate('/orders/create', { state: { item } });
  };

  return (
    <div>
      <NavigationBar/>
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} style={{ width: "300px", height: "300px", objectFit: "cover" }} />
      <p>{item.description}</p>
      <button onClick={handleOrderCreation}>Make a new order</button>
    </div>
  );
};

export default ItemPage;
