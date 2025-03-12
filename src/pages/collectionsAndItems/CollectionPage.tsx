import React, { useContext } from "react";
import { useParams, Link } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Collection } from "../../components/types";
import styles from './CollectionPage.module.css';

const CollectionPage: React.FC = () => {
  const apiContext = useContext(ApiContext);
  const { collectionId } = useParams<{ collectionId: string }>();

  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  const { collections = [], items = [], loading, error } = apiContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const collection = collections.find((c: Collection) => c.collection_id === collectionId);

  if (!collection) {
    return <p>Collection not found.</p>;
  }

  // Helper function to find items by item_id
  const getItemById = (itemId: string) => {
    return items.find((item) => item.item_id === itemId);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>{collection.name}</h1>
      <p><strong>Season:</strong> {collection.season} {collection.year}</p>
      <h4>Items in this collection:</h4>
      <ul>
        {collection.items.map((itemId) => {
          const item = getItemById(itemId);
          return item ? (
            <li key={item.item_id}>
              <Link to={`/items/${item.item_id}`} className={styles.itemLink}>
                {item.name} - ${item.price} {item.currency}
              </Link>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default CollectionPage;
