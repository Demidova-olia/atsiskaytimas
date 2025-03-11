import React, { useContext, useState } from "react";
import { Link } from "react-router";

import styles from './CollectionsAndItems.module.css';
import { ApiContext } from "../../contexts/ApiContext";
import { Collection, Item } from "../../components/types";

const CollectionsAndItemsPage: React.FC = () => {
  const apiContext = useContext(ApiContext);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

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

  const handleCollectionClick = (collectionId: string) => {
    if (selectedCollectionId === collectionId) {
      setSelectedCollectionId(null);
    } else {
      setSelectedCollectionId(collectionId); 
    }
  };

  return (
    <div>
      <h1>Collections:</h1>
      {collections.length > 0 ? (
        <div>
          {collections.map((collection: Collection) => {
            const collectionItems = items.filter((item: Item) => item.collection_id === collection.collection_id);

            return (
              <div key={collection.collection_id}>
                <button onClick={() => handleCollectionClick(collection.collection_id)}>
                  <h2>{collection.name} ({collection.season} {collection.year})</h2>
                </button>

                {selectedCollectionId === collection.collection_id && collectionItems.length > 0 ? (
                  <ul>
                    {collectionItems.map((item: Item) => (
                      <li key={item.item_id} className={styles.item}>
                        <Link to={`/items/${item.item_id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className={styles.itemImage}
                          />
                          <p>{item.name}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : selectedCollectionId === collection.collection_id && collectionItems.length === 0 ? (
                  <p>No items found in this collection.</p>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No collections found.</p>
      )}
    </div>
  );
};

export default CollectionsAndItemsPage;




