import React, { useContext } from "react";
import { Link } from "react-router";
import { ApiContext } from "../../contexts/ApiContext";
import { Designer } from "../../components/types";
import styles from './DesignersPage.module.css';  // Import the CSS module

const DesignersPage: React.FC = () => {
  const apiContext = useContext(ApiContext);

  if (!apiContext) {
    return <p>Loading context...</p>;
  }

  const { designers = [], collections = [], loading, error } = apiContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Create a helper function to find collections by collection_id
  const getCollectionById = (collectionId: string) => {
    return collections.find((collection) => collection.collection_id === collectionId);
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

              {/* Display collections for each designer */}
              <div className={styles.collections}>
              <h4>
                {designer.collections.length === 0
                  ? "No collections yet"
                  : designer.collections.length === 1
                  ? "Collection:"
                  : "Collections:"}
              </h4>
                <ul>
                  {designer.collections.map((collectionId) => {
                    const collection = getCollectionById(collectionId);
                    return collection ? (
                      <li key={collection.collection_id}>
                        <Link to={`/collections/${collection.collection_id}`} className={styles.collectionLink}>
                          {collection.name} ({collection.season} {collection.year})
                        </Link>
                      </li>
                    ) : null;
                  })}
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



