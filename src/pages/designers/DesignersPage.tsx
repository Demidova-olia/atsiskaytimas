import React, { useContext } from "react";
import { Link } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Designer, Collection, Item } from "../../components/types";
import styles from './DesignersPage.module.css';

const DesignersPage: React.FC = () => {
  const apiContext = useContext(ApiContext);

  // Ensure apiContext and its properties are available
  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  const { designers = [], collections = [], items = [], loading, error } = apiContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const getCollectionsByDesignerId = (designerId: string) => {
    const collectionsForDesigner = collections.filter(
      (collection) => collection.designer_id === designerId
    );
    return collectionsForDesigner || [];
  };

  const getItemsByCollectionId = (collectionId: string) => {
    const itemsForCollection = items.filter((item) => item.collection_id === collectionId);
    return itemsForCollection || [];
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Designers:</h1>
      <Link to="/designers/create" className={styles.addDesignerLink}>Add New Designer</Link>
      {designers.length > 0 ? (
        <ul className={styles.designerList}>
          {designers.map((designer: Designer) => (
            <li key={designer.designer_id} className={styles.designerItem}>
              <Link to={`/designers/${designer.designer_id}`} className={styles.designerLink}>
                <div>
                  <img src={designer.image} alt={designer.name} className={styles.designerImage} />
                </div>
                {designer.designer_id}. {designer.name}
              </Link>

              <div className={styles.collections}>
                <h4>
                  {getCollectionsByDesignerId(designer.designer_id).length === 0
                    ? "No collections yet"
                    : getCollectionsByDesignerId(designer.designer_id).length === 1
                    ? "Collection:"
                    : "Collections:"}
                </h4>
                <ul>
                  {getCollectionsByDesignerId(designer.designer_id).map((collection: Collection) => (
                    <li key={collection.collection_id}>
                      <Link to={`/collections/${collection.collection_id}`} className={styles.collectionLink}>
                        {collection.name} ({collection.season} {collection.year})
                      </Link>

                      <ul>
                        {getItemsByCollectionId(collection.collection_id).map((item: Item) => (
                          <li key={item.item_id} className={styles.item}>
                            <Link to={`/items/${item.item_id}`} className={styles.itemLink}>
                              <img src={item.image} alt={item.name} className={styles.itemImage} />
                              <div className={styles.itemDetails}>
                                <h4>{item.name}</h4>
                                <p>{item.material}</p>
                                <p>{item.price} {item.currency}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noDesigners}>No designers found.</p>
      )}
    </div>
  );
};

export default DesignersPage;
