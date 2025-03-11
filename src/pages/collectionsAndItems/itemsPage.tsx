import React, { useContext } from "react";
import { useParams, Link } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Item } from "../../components/types";

const ItemsPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
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

  const filteredItems = items.filter(item => item.collection_id === String(collectionId));

  return (
    <div>
      <h1>Items in Collection {collectionId}</h1>
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item: Item) => (
            <li key={item.item_id}>
              <Link to={`/items/${item.item_id}`}>
                <img src={item.image} alt={item.name} style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found in this collection.</p>
      )}
    </div>
  );
};

export default ItemsPage;
