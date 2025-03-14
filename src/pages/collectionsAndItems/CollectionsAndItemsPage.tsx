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
            const collectionItems = items.filter((item: Item) => item.collectionId === collection.collectionId);

            return (
              <div key={collection.collectionId} className={styles.collectionContainer}>
                <button className={styles.collectionButton} onClick={() => handleCollectionClick(collection.collectionId)}>
                  <h2>{collection.name} ({collection.season} {collection.year})</h2>
                </button>

                {selectedCollectionId === collection.collectionId && collectionItems.length > 0 ? (
                  <ul>
                    {collectionItems.map((item: Item) => (
                      <li key={item.itemId} className={styles.item}>
                        <Link to={`/items/${item.itemId}`}>
                          <img src={item.image} alt={item.name} className={styles.itemImage} />
                          <p>{item.name}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : selectedCollectionId === collection.collectionId && collectionItems.length === 0 ? (
                  <div>
                    <p>No items found in this collection.</p>
                  </div>
                ) : null}

                {selectedCollectionId === collection.collectionId && (
                  <Link to={`/items/create/${collection.collectionId}`} className={styles.addItemLink}>
                    Add Item
                  </Link>
                )}
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

