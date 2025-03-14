import React, { useContext } from "react";
import { useParams, Link } from "react-router";

import styles from './ItemsPage.module.css';
import { ApiContext } from "../../../contexts/ApiContext";
import { Item } from "../../../components/types";

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

  const filteredItems = items.filter(item => item.collectionId === String(collectionId));

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Items in Collection {collectionId}</h1>
      <Link to="/items/create" className={styles.addItemLink}>Add New Item</Link>
      {filteredItems.length > 0 ? (
        <ul className={styles.itemsList}>
          {filteredItems.map((item: Item) => (
            <li key={item.itemId} className={styles.itemListItem}>
              <Link to={`/items/${item.itemId}`}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={styles.itemImage} 
                />
                <p className={styles.itemName}>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noItemsMessage}>No items found in this collection.</p>
      )}
    </div>
  );
};

export default ItemsPage;

